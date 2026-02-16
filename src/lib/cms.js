import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';

// --- Newsletters ---

export async function getNewsletters() {
    const db = await getDb();
    return await db.collection('newsletters').find({}).sort({ createdAt: -1 }).toArray();
}

export async function createNewsletter(data) {
    const db = await getDb();
    return await db.collection('newsletters').insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

export async function updateNewsletter(id, data) {
    const db = await getDb();
    // Remove _id from data if present to avoid immutable field error
    const { _id, ...updateData } = data;
    return await db.collection('newsletters').updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }
    );
}

// --- Blogs ---

export async function getBlogs() {
    const db = await getDb();
    return await db.collection('blogs').find({}).sort({ updatedAt: -1 }).toArray();
}

export async function getBlog(slug) {
    const db = await getDb();
    return await db.collection('blogs').findOne({ slug });
}

export async function createBlog(data) {
    const db = await getDb();
    // Default blank template fields if not provided
    const blogData = {
        title: data.title || 'Untitled Blog',
        slug: data.slug || `blog-${Date.now()}`,
        author: data.author || 'Author',
        publishedDate: data.publishedDate || new Date().toISOString(),
        // dynamic content fields
        content: data.content || [], 
        summary: data.summary || null,
        points: data.points || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft'
    };
    
    return await db.collection('blogs').insertOne(blogData);
}

export async function updateBlog(slug, data) {
    const db = await getDb();
    const { _id, ...updateData } = data;
    return await db.collection('blogs').updateOne(
        { slug },
        { 
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }
    );
}

// Keep legacy model functions if needed for reference, but primary flow is now above
export async function getContentModels() {
    const db = await getDb();
    return await db.collection('content_models').find({}).toArray();
}

export async function getEntries(modelSlug = null, status = null, projection = {}) {
    // Legacy support or if we migrate old entries to blogs
    const db = await getDb();
    
    // If asking for generic 'blog' or all entries (assuming all are blogs for now in this transition)
    if (!modelSlug || modelSlug === 'blog') {
        const query = {};
        if (status) query.status = status;
        return await db.collection('blogs').find(query, { projection }).sort({ updatedAt: -1 }).toArray();
    }
    
    const query = { modelSlug };
    if (status) query.status = status;
    return await db.collection('content_entries').find(query, { projection }).toArray();
}
