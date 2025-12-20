import { getDb } from '$lib/db';
import { error } from '@sveltejs/kit';

function getBestImage(data) {
    const fields = [
        'coverImage', 'Cover Image', 'featured-image', 'FeaturedImage', 'Featured Image',
        'image', 'Image', 'thumbnail', 'Thumbnail', 'hero-image', 'Hero Image', 'image-url', 'Image URL'
    ];
    for (const field of fields) {
        if (data[field] && typeof data[field] === 'string' && (data[field].startsWith('http') || data[field].startsWith('data:image') || data[field].startsWith('/'))) {
            return data[field];
        }
    }
    return null;
}

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

    return {
        newsletter: { ...newsletter, _id: newsletter._id.toString() },
        posts: posts.map(p => ({
            ...p,
            _id: p._id.toString(),
            coverImage: getBestImage(p.data || {})
        }))
    };
}
