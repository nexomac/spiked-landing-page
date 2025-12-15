import { getEntries } from '$lib/cms';

export async function load() {
    // Assuming 'blog-post' is the slug users will use. 
    // If they create a different one, this needs to be dynamic or configured.
    // For now, hardcode 'blog-post' as the primary blog model.
    console.log('Fetching live blog posts...');
    // Fetch ALL live entries for the blog listing, regardless of model.
    // This allows mixed content types (Blog Post, Article, Update) to appear.
    const posts = await getEntries(null, 'live');
    console.log(`Found ${posts.length} posts`);
    return {
        posts: posts.map(p => ({
            ...p,
            _id: p._id.toString(),
            // Flatten data for easier access in template
            title: p.data?.title || p.data?.Title || 'Untitled',
            slug: p.data?.slug || p.data?.Slug,
            coverImage: p.data?.coverImage || p.data?.['Cover Image'],
            excerpt: p.data?.excerpt || p.data?.Excerpt,
            author: p.data?.author || p.data?.Author,
            publishedDate: p.data?.publishedDate || p.data?.['Published Date'] || p.createdAt
        }))
    };
}
