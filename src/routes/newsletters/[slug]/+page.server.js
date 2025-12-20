import { getDb } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const db = await getDb();
    const { slug } = params;

    const newsletter = await db.collection('newsletters').findOne({ slug });

    if (!newsletter) {
        throw error(404, 'Newsletter not found');
    }

    // Find blog posts associated with this newsletter
    const posts = await db.collection('content_entries').find({
         newsletters: { $in: [newsletter._id.toString()] },
         status: 'live' 
    }).sort({ createdAt: -1 }).toArray(); 
    // Note: 'createdAt' or 'publishedDate' depending on what is stored. 
    // cms.js uses createdAt/updatedAt at root. data.publishedDate is in data.

    return {
        newsletter: { ...newsletter, _id: newsletter._id.toString() },
        posts: posts.map(p => ({
            ...p,
            _id: p._id.toString(),
            // Ensure we pass the data field up for easy access in the template or use p.data directly
        }))
    };
}
