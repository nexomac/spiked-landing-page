import { getEntryBySlug, getContentModel } from '$lib/cms';
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
    const post = await getEntryBySlug(null, params.slug);
    
    if (!post) throw error(404, 'Article not found');

    const model = await getContentModel(post.modelSlug);

    return {
        post: {
            ...post,
             _id: post._id.toString(),
            title: post.data?.title || post.data?.Title,
            coverImage: getBestImage(post.data || {}),
            body: post.data?.body || post.data?.Body || {},
            sidebar: post.data?.sidebar || post.data?.Sidebar,
            author: post.data?.author || post.data?.Author,
            publishedDate: post.data?.publishedDate || post.data?.['Published Date'] || post.createdAt
        },
        modelFields: model?.fields || []
    };
}
