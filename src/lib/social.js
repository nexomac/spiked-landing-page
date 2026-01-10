import { getDb } from '$lib/db';
import { ObjectId } from 'mongodb';

const COLLECTION = 'social_queue';

export async function getSocialQueue() {
    const db = await getDb();
    return await db.collection(COLLECTION).find({ status: { $ne: 'published' } }).sort({ scheduledFor: 1, createdAt: -1 }).toArray();
}

export async function getSocialHistory(limit = 20) {
    const db = await getDb();
    return await db.collection(COLLECTION).find({ status: 'published' }).sort({ publishedAt: -1 }).limit(limit).toArray();
}

export async function addToQueue(data) {
    const db = await getDb();
    return await db.collection(COLLECTION).insertOne({
        ...data,
        status: data.status || 'draft',
        sourceType: data.sourceType || 'manual', // manual, blog, api
        author: data.author || 'user', // user, ai
        accountHandle: data.accountHandle || 'SpikedAI',
        createdAt: new Date(),
        updatedAt: new Date()
    });
}

export async function updateQueueItem(id, data) {
    const db = await getDb();
    // eslint-disable-next-line no-unused-vars
    const { _id, ...updateData } = data;
    
    return await db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }
    );
}

export async function deleteQueueItem(id) {
    const db = await getDb();
    return await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
}

export async function approveItem(id) {
    const db = await getDb();
    return await db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: {
                status: 'approved',
                updatedAt: new Date()
            }
        }
    );
}

export async function markAsPublished(id, metadata = {}) {
    const db = await getDb();
    return await db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { 
            $set: {
                status: 'published',
                publishedAt: new Date(),
                metadata
            }
        }
    );
}
