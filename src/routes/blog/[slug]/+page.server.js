import { getBlog } from '$lib/cms';
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
    const post = await getBlog(params.slug);
    
    if (!post) throw error(404, 'Article not found');

    return {
        post: {
            ...post,
             _id: post._id.toString(),
            // Mapping for compatibility + new fields
            title: post.title || post.data?.title || post.data?.Title,
            coverImage: post.coverImage || getBestImage(post.data || {}) || (post.content?.find(b => b.type === 'image')?.data?.url),
            author: post.author || post.data?.author || post.data?.Author || 'Editorial Staff',
            publishedDate: post.publishedDate || post.data?.publishedDate || post.createdAt
        },
        modelFields: [] // No longer used for new system
    };
}
