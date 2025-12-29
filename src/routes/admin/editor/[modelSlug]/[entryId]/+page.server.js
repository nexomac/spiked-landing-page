import { getEntry, getContentModel, updateEntry, deleteEntry } from '$lib/cms';
import { getDb } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';
import { ObjectId } from 'mongodb'; // Import directly to use in manual update

export async function load({ params }) {
    const entry = await getEntry(params.entryId);
    const model = await getContentModel(params.modelSlug);

    if (!entry || !model) throw error(404, 'Not found');

    const db = await getDb();
    const newsletters = await db.collection('newsletters').find({}).toArray();



    const normalizedData = {
        ...entry.data,
        title: entry.title || getFuzzyValue(entry.data, 'title') || getFuzzyValue(entry.data, 'name') || '',
        slug: entry.slug || getFuzzyValue(entry.data, 'slug') || '',
        author: entry.author || getFuzzyValue(entry.data, 'author') || 'Editorial Staff',
        publishedDate: (entry.publishedDate || getFuzzyValue(entry.data, 'publishedDate') || getFuzzyValue(entry.data, 'publishDate'))
            ? new Date(entry.publishedDate || getFuzzyValue(entry.data, 'publishedDate') || getFuzzyValue(entry.data, 'publishDate')).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16)
    };

    return {
        entry: { 
            ...entry, 
            _id: entry._id.toString(),
            data: normalizedData
        },
        model: { ...model, _id: model._id.toString() },
        newsletters: newsletters.map(n => ({ ...n, _id: n._id.toString() }))
    };
}

// Helper to find fuzzy keys in an object (shared by load and save)
function getFuzzyValue(obj, target) {
    if (!obj) return null;
    const keys = Object.keys(obj);
    const targetClean = target.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 1. Direct match
    if (obj[target] !== undefined) return obj[target];
    
    // 2. Fuzzy match
    const foundKey = keys.find(k => {
        const kClean = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        return kClean === targetClean || kClean.includes(targetClean) || targetClean.includes(kClean);
    });
    
    return foundKey ? obj[foundKey] : null;
}

export const actions = {
    save: async ({ request, params, cookies }) => {
        requireAuth(cookies);
        const formData = await request.formData();
        const status = formData.get('status'); // 'draft' or 'live'
        
        // Fetch existing entry and model to merge data strictly
        const [existingEntry, model] = await Promise.all([
            getEntry(params.entryId),
            getContentModel(params.modelSlug)
        ]);
        const existingData = existingEntry ? existingEntry.data : {};

        // Extract Newsletter IDs
        const newsletterIds = formData.getAll('newsletters');

        // Convert FormData to Object (pre-processing richtext)
        const incomingData = {};
        for (const [key, value] of formData.entries()) {
            if (key !== 'status' && key !== 'newsletters') {
                const cleanKey = key.replace('richtext_', '');
                if (key.startsWith('richtext_')) {
                    try { incomingData[cleanKey] = JSON.parse(value); } catch (e) {}
                } else {
                    incomingData[cleanKey] = value;
                }
            }
        }
        
        // Strict Merge: Map everything to slugs defined in the model
        const mergedData = {};
        model.fields.forEach(field => {
            // Priority 1: New value just submitted for this slug
            if (incomingData[field.slug] !== undefined) {
                mergedData[field.slug] = incomingData[field.slug];
            }
            // Priority 2: Existing value (might be under a legacy human name)
            else {
                const existingVal = getFuzzyValue(existingData, field.slug);
                if (existingVal !== null) {
                    mergedData[field.slug] = existingVal;
                }
            }
        });

        // Add special handling for core fields that might not be in model.fields
        const title = incomingData.title || getFuzzyValue(mergedData, 'title') || getFuzzyValue(mergedData, 'name') || 'Untitled';
        const slug = incomingData.slug || getFuzzyValue(mergedData, 'slug') || '';
        const author = incomingData.author || getFuzzyValue(mergedData, 'author') || 'Editorial Staff';
        const publishedDate = incomingData.publishedDate || getFuzzyValue(mergedData, 'publishedDate') || getFuzzyValue(mergedData, 'publishDate') || new Date().toISOString();

        // Ensure these core fields are also in the data object as slugs
        mergedData.title = title;
        mergedData.slug = slug;
        mergedData.author = author;
        mergedData.publishedDate = publishedDate;

        // Save entry via CMS lib (updates data and status)
        await updateEntry(params.entryId, mergedData, status);
        
        // Manual update for top-level fields (newsletters, title, slug, author, publishedDate)
        const db = await getDb();
        await db.collection('content_entries').updateOne(
            { _id: new ObjectId(params.entryId) },
            { 
                $set: { 
                    newsletters: newsletterIds,
                    title,
                    slug,
                    author,
                    publishedDate,
                    updatedAt: new Date()
                } 
            }
        );

        return { success: true };
    },

    delete: async ({ params, cookies }) => {
        requireAuth(cookies);
        await deleteEntry(params.entryId);
        throw redirect(303, `/admin/entries/${params.modelSlug}`);
    }
};
