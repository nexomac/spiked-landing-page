import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db.js';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const db = await getDb();
        const collection = db.collection('onboarding_entries');

        const result = await collection.insertOne({
            ...data,
            submittedAt: new Date(),
            source: 'onboarding_flow'
        });

        return json({ 
            success: true, 
            id: result.insertedId 
        });
    } catch (error) {
        console.error('Onboarding submission error:', error);
        return json({ 
            success: false, 
            message: 'Failed to save onboarding data' 
        }, { status: 500 });
    }
}
