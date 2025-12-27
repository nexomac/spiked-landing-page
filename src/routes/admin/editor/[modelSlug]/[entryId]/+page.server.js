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

    return {
        entry: { ...entry, _id: entry._id.toString() },
        model: { ...model, _id: model._id.toString() },
        newsletters: newsletters.map(n => ({ ...n, _id: n._id.toString() }))
    };
}

export const actions = {
    save: async ({ request, params, cookies }) => {
        requireAuth(cookies);
        const formData = await request.formData();
        const status = formData.get('status'); // 'draft' or 'live'
        
        // Fetch existing entry to merge data
        const existingEntry = await getEntry(params.entryId);
        const existingData = existingEntry ? existingEntry.data : {};

        // Extract Newsletter IDs
        const newsletterIds = formData.getAll('newsletters');

        // Convert FormData to Object
        const incomingData = {};
        for (const [key, value] of formData.entries()) {
            if (key !== 'status' && key !== 'newsletters') {
                const cleanKey = key.replace('richtext_', '');
                if (key.startsWith('richtext_')) {
                    try {
                        incomingData[cleanKey] = JSON.parse(value);
                    } catch (e) {
                         // fallback
                    }
                } else {
                    incomingData[cleanKey] = value;
                }
            }
        }
        
        // Smart Merge: prevent casing duplicates (Title vs title)
        const mergedData = { ...existingData };
        for (const [newKey, newValue] of Object.entries(incomingData)) {
            // Find if a case-insensitive match exists
            const existingKeyMatch = Object.keys(mergedData).find(
                k => k.toLowerCase() === newKey.toLowerCase()
            );
            
            if (existingKeyMatch) {
                // Update the existing key (preserving its casing)
                mergedData[existingKeyMatch] = newValue;
            } else {
                // Add as new key
                mergedData[newKey] = newValue;
            }
        }

        // Save entry via CMS lib (updates data and status)
        await updateEntry(params.entryId, mergedData, status);
        
        // Manual update for newsletters field (which is top-level, not in data)
        const db = await getDb();
        await db.collection('content_entries').updateOne(
            { _id: new ObjectId(params.entryId) },
            { $set: { newsletters: newsletterIds } }
        );

        return { success: true };
    },

    delete: async ({ params, cookies }) => {
        requireAuth(cookies);
        await deleteEntry(params.entryId);
        throw redirect(303, `/admin/entries/${params.modelSlug}`);
    }
};
