import { getDb } from '$lib/db';
import { requireAuth } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
    requireAuth(cookies);
    const db = await getDb();
    
    // Fetch all newsletter definitions
    const newsletters = await db.collection('newsletters').find({}).toArray();

    return {
        newsletters: newsletters.map(n => ({
            ...n,
            _id: n._id.toString()
        }))
    };
}

export const actions = {
    create: async ({ request, cookies }) => {
        requireAuth(cookies);
        const data = await request.formData();
        const title = data.get('title');
        const description = data.get('description');
        const slug = data.get('slug');

        if (!title || !slug) {
            return fail(400, { missing: true });
        }

        const db = await getDb();
        
        try {
            await db.collection('newsletters').insertOne({
                title,
                description,
                slug,
                createdAt: new Date()
            });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    }
};
