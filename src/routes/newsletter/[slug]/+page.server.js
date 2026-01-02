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
    // Support both single ID (old/simple) and array (new)
    // Support 'published' status
    const nId = newsletter._id.toString();
    const query = {
        status: 'published',
        $or: [
            { newsletterId: nId },
            { newsletterIds: nId }
        ]
    };
    
    // Also include 'live' to be safe? The user said 'published' for new blogs. Old ones were 'live'.
    // Let's make status check allow both.
    delete query.status;
    query.status = { $in: ['published', 'live'] };

    const posts = await db.collection('blogs').find(query).sort({ publishedDate: -1, createdAt: -1 }).toArray();

    return {
        newsletter: { ...newsletter, _id: newsletter._id.toString() },
        posts: posts.map(p => ({
            ...p,
            _id: p._id.toString(),
            title: p.title || p.data?.title || p.data?.Title || 'Untitled',
            slug: p.slug || p.data?.slug || p.data?.Slug,
            author: p.author || p.data?.author || p.data?.Author,
            publishedDate: p.publishedDate || p.createdAt,
            coverImage: p.coverImage || getBestImage(p.data || {})
        }))
    };
}
