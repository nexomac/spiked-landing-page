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

export async function createEntry(modelSlug, data) {
    const db = await getDb();
    const model = await getContentModel(modelSlug);
    if (!model) throw new Error(`Model ${modelSlug} not found`);

    return await db.collection('content_entries').insertOne({
        modelSlug,
        data, // The actual content fields
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
