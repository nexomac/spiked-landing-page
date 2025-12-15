import { getEntryBySlug } from '$lib/cms';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // Pass null for modelSlug to search all
    const post = await getEntryBySlug(null, params.slug);
    
    if (!post) throw error(404, 'Article not found');

    return {
        post: {
            ...post,
             _id: post._id.toString(),
            // Flatten for easier usage
            title: post.data?.title || post.data?.Title,
            body: post.data?.body || post.data?.Body || {}, // Tiptap JSON
            sidebar: post.data?.sidebar || post.data?.Sidebar, // Optional sidebar content
            author: post.data?.author || post.data?.Author,
            publishedDate: post.data?.publishedDate || post.data?.['Published Date'] || post.createdAt
        }
    };
}
