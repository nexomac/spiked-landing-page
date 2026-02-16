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

function extractSummary(data) {
    if (!data) return null;
    const summaryField =
        data.summary ||
        data.Summary ||
        data['trend-category'] ||
        data['Trend Category'] ||
        data['summary-text'] ||
        data['Summary Text'];

    if (summaryField && typeof summaryField === 'object' && summaryField.type === 'doc') {
        const text = extractTextFromTiptap(summaryField).trim();
        if (text) return text.slice(0, 240) + '...';
    }

    if (typeof summaryField === 'string' && summaryField.trim().length > 0) {
        const cleaned = summaryField.trim();
        return cleaned.length > 240 ? cleaned.slice(0, 240) + '...' : cleaned;
    }

    return null;
}

function extractPoints(data) {
    if (!data) return null;

    const candidateFields = [
        'points',
        'Points',
        'points-of-interest',
        'Points of Interest',
        'pointsOfInterest',
        'keyPoints',
        'key-points',
        'Key Points',
        'bullets',
        'bulletPoints',
        'Bullet Points',
        'highlights',
        'Highlights',
        'takeaways',
        'Takeaways'
    ];

    for (const field of candidateFields) {
        const val = data[field];
        if (!val) continue;

        if (Array.isArray(val)) {
            const cleaned = val
                .map(item => (typeof item === 'string' ? item.trim() : ''))
                .filter(Boolean);
            if (cleaned.length) return cleaned;
        }

        if (typeof val === 'string') {
            const items = val
                .split(/\r?\n|•|- /)
                .map(item => item.trim())
                .filter(Boolean);
            if (items.length) return items;
        }

        if (val && typeof val === 'object' && val.type === 'doc') {
            const text = extractTextFromTiptap(val).trim();
            if (text.length > 20) {
                const sentences = text
                    .split(/(?<=[.!?])\s+/)
                    .map(sentence => sentence.replace(/\s*\.+$/, '').trim())
                    .filter(sentence => sentence.length > 12);
                if (sentences.length) return sentences;
            }
        }
    }

    return null;
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
    const db = await getDb();
    
    // FETCH ONLY METADATA: Explicitly exclude 'content' blocks which are heavy
    const blogsProjection = {
        title: 1,
        slug: 1,
        author: 1,
        publishedDate: 1,
        createdAt: 1,
        summary: 1,
        points: 1,
        coverImage: 1,
        newsletterId: 1,
        newsletterIds: 1,
        data: 1, // Keep legacy data for fallbacks
        status: 1
    };

    const posts = await getEntries(null, 'published', blogsProjection);
    
    // Fetch available newsletters for the subscription section
    const newsletters = await db.collection('newsletters').find({}).toArray();

    const processedPosts = posts.map(p => {
        // Since we excluded 'content', we mostly rely on p.coverImage or p.data fallbacks
        const coverImage = p.coverImage || getBestImage(p.data || {});
        
        // Excerpt is less critical now as we use 'summary' for the main layout, 
        // but we'll keep a minimal version for compatibility
        const excerpt = getBestExcerpt(p.data || {});
        
        const summary =
            extractSummary(p.data || {}) ||
            (typeof p.summary === 'string' ? p.summary : null);
        const points =
            extractPoints(p.data || {}) ||
            (Array.isArray(p.points) ? p.points : null);

        // RETURN ONLY WHAT'S NEEDED: Do NOT use ...p as it might include leftover hidden fields
        return {
            _id: p._id.toString(),
            title: p.title || p.data?.title || p.data?.Title || 'Untitled',
            slug: p.slug || p.data?.slug || p.data?.Slug,
            coverImage,
            excerpt: excerpt || 'Read this article...',
            summary,
            points,
            author: p.author || p.data?.author || p.data?.Author || 'Editorial Staff',
            publishedDate: p.publishedDate || p.data?.publishedDate || p.data?.['Published Date'] || p.createdAt,
            newsletterId: p.newsletterId,
            newsletterIds: p.newsletterIds || []
        };
    });

    const processedNewsletters = newsletters.map(n => {
        const nId = n._id.toString();
        const newsletterPosts = processedPosts
            .filter(p => 
                p.newsletterId === nId || 
                (Array.isArray(p.newsletterIds) && p.newsletterIds.includes(nId))
            )
            .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

        return {
            ...n,
            _id: nId,
            posts: newsletterPosts
        };
    });

    return {
        posts: processedPosts,
        newsletters: processedNewsletters
    };
}
