import { getEntries } from '$lib/cms';
import { getDb } from '$lib/db';

function extractTextFromTiptap(node) {
    if (!node) return '';
    if (node.type === 'text') return node.text;
    if (node.content && Array.isArray(node.content)) {
        return node.content.map(child => extractTextFromTiptap(child)).join(' ');
    }
    return '';
}

function getBestExcerpt(data) {
    const fields = ['excerpt', 'Excerpt', 'summary', 'Summary', 'content', 'Content', 'trend-category'];
    for (const field of fields) {
        const val = data[field];
        if (!val) continue;

        if (typeof val === 'object' && val.type === 'doc') {
            const text = extractTextFromTiptap(val).trim();
            if (text) return text.slice(0, 180) + '...';
        }

        if (typeof val === 'string' && val.length > 10) {
            return val.slice(0, 180) + '...';
        }
    }
    return 'Click to read the full story...';
}

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

export async function load() {
    console.log('Fetching live blog posts...');
    const db = await getDb();
    
    // Fetch ALL published entries for the blog listing
    // Updated to ask for 'published' status to match new editor flow
    const posts = await getEntries(null, 'published');
    
    // Fetch available newsletters for the subscription section
    const newsletters = await db.collection('newsletters').find({}).toArray();

    return {
        posts: posts.map(p => {
            // 1. Root property (New Editor)
            // 2. Legacy data object
            // 3. Fallback to finding an image block in content
            let coverImage = p.coverImage || getBestImage(p.data || {});
            
            if (!coverImage && p.content && Array.isArray(p.content)) {
                const imageBlock = p.content.find(b => b.type === 'image');
                if (imageBlock && imageBlock.data?.url) {
                    coverImage = imageBlock.data.url;
                }
            }
            
            // Helper to find text excerpt in blocks
            let excerpt = getBestExcerpt(p.data || {});
            if ((!excerpt || excerpt === 'Click to read the full story...') && p.content && Array.isArray(p.content)) {
                const textBlock = p.content.find(b => b.type === 'text' || b.type === 'richtext');
                if (textBlock) {
                    if (textBlock.type === 'text') excerpt = textBlock.data.content?.slice(0, 180) + '...';
                    if (textBlock.type === 'richtext' && typeof textBlock.data.html === 'string') {
                         // Very basic strip tags
                        excerpt = textBlock.data.html.replace(/<[^>]*>?/gm, '').slice(0, 180) + '...';
                    }
                }
            }

            return {
                ...p,
                _id: p._id.toString(),
                // New system puts these at root, legacy put them in data
                title: p.title || p.data?.title || p.data?.Title || 'Untitled',
                slug: p.slug || p.data?.slug || p.data?.Slug,
                coverImage,
                excerpt: excerpt || 'Read this article...',
                author: p.author || p.data?.author || p.data?.Author || 'Editorial Staff',
                publishedDate: p.publishedDate || p.data?.publishedDate || p.data?.['Published Date'] || p.createdAt
            };
        }),
        newsletters: newsletters.map(n => ({
            ...n,
            _id: n._id.toString()
        }))
    };
}
