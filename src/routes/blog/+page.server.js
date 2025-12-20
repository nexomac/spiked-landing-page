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
    
    // Fetch ALL live entries for the blog listing
    const posts = await getEntries(null, 'live');
    
    // Fetch available newsletters for the subscription section
    const newsletters = await db.collection('newsletters').find({}).toArray();

    return {
        posts: posts.map(p => ({
            ...p,
            _id: p._id.toString(),
            title: p.data?.title || p.data?.Title || 'Untitled',
            slug: p.data?.slug || p.data?.Slug,
            coverImage: getBestImage(p.data || {}),
            excerpt: getBestExcerpt(p.data || {}),
            author: p.data?.author || p.data?.Author || 'Editorial Staff',
            publishedDate: p.data?.publishedDate || p.data?.['Published Date'] || p.data?.['date-of-analysis'] || p.createdAt
        })),
        newsletters: newsletters.map(n => ({
            ...n,
            _id: n._id.toString()
        }))
    };
}
