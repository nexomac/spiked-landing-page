import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';

// --- Content Models ---

export async function createContentModel(modelDef) {
    const db = await getDb();
    // modelDef: { name: 'Blog Post', slug: 'blog-post', fields: [...] }
    return await db.collection('content_models').insertOne({
        ...modelDef,
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

export async function getContentModels() {
    const db = await getDb();
    return await db.collection('content_models').find({}).toArray();
}

export async function getContentModel(slug) {
    const db = await getDb();
    return await db.collection('content_models').findOne({ slug });
}

// --- Entries ---

export async function createEntry(modelSlug, rawData) {
    const db = await getDb();
    const model = await getContentModel(modelSlug);
    if (!model) throw new Error(`Model ${modelSlug} not found`);

    // Strict Field Enforcement: Only keep keys that exist as slugs in the model
    const data = {};
    model.fields.forEach(field => {
        // Try exact slug match
        if (rawData[field.slug] !== undefined) {
            data[field.slug] = rawData[field.slug];
        } 
        // Fallback: try case-insensitive match for resilience (but store as slug)
        else {
            const ciKey = Object.keys(rawData).find(k => k.toLowerCase() === field.slug.toLowerCase());
            if (ciKey) {
                data[field.slug] = rawData[ciKey];
            }
        }
    });

    // Extract core fields to top level for indexing/querying
    const title = data.title || data.name || 'Untitled';
    const slug = data.slug || '';
    const author = data.author || 'Editorial Staff';
    const publishedDate = data.publishedDate || new Date().toISOString();

    return await db.collection('content_entries').insertOne({
        modelSlug,
        title,
        slug,
        author,
        publishedDate,
        data, // The strictly filtered content fields
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

export async function updateEntry(id, data, status = 'draft') {
    const db = await getDb();
    return await db.collection('content_entries').updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: { 
                data,
                status, 
                updatedAt: new Date() 
            } 
        }
    );
}

export async function getEntries(modelSlug = null, status = null) {
    const db = await getDb();
    const query = {};
    if (modelSlug) {
        query.modelSlug = modelSlug;
    }
    if (status) {
        query.status = status;
    }
    return await db.collection('content_entries').find(query).sort({ updatedAt: -1 }).toArray();
}

export async function deleteEntry(id) {
    const db = await getDb();
    return await db.collection('content_entries').deleteOne({ _id: new ObjectId(id) });
}

export async function getEntry(id) {
    const db = await getDb();
    return await db.collection('content_entries').findOne({ _id: new ObjectId(id) });
}

export async function getEntryBySlug(modelSlug, entrySlug) {
     const db = await getDb();
     const query = { 
         $or: [
             { 'data.slug': entrySlug },
             { 'data.Slug': entrySlug }
         ],
         status: 'live' 
     };
     // If modelSlug is provided, strict filter. Otherwise, search all.
     if (modelSlug) {
         query.modelSlug = modelSlug;
     }

     return await db.collection('content_entries').findOne(query);
}
