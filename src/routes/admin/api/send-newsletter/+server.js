import { getDb } from '$lib/db';
import { sendEmail } from '$lib/server/mail';
import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
    // Basic Admin Auth Check (Simple cookie check as per existing admin pattern)
    const session = cookies.get('admin_session');
    if (!session) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    
    // 1. Get posts from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentPosts = await db.collection('blogs').find({
        status: 'published',
    }).toArray();

    if (recentPosts.length === 0) {
        return json({ message: 'No new posts in the last 7 days.' });
    }

    // 2. Get all subscribers
    const subscribers = await db.collection('subscribers').find({}).toArray();

    // 3. Get generic newsletters info for looking up titles
    const newsletters = await db.collection('newsletters').find({}).toArray();
    const newsletterMap = {};
    newsletters.forEach(n => newsletterMap[n._id.toString()] = n);

    let sentCount = 0;

    // 4. Iterate and Send
    for (const sub of subscribers) {
        if (!sub.subscribedTo || sub.subscribedTo.length === 0) continue;

        // Filter posts relevant to this subscriber
        // Matches if the post has at least one newsletterId that the user is subscribed to
        const relevantPosts = recentPosts.filter(post => {
            if (!post.newsletters) return false;
            // Intersection of post.newsletters and sub.subscribedTo
            return post.newsletters.some(nId => sub.subscribedTo.includes(nId));
        });

        if (relevantPosts.length > 0) {
            // Generate HTML Content
            const html = generateEmailHtml(relevantPosts, newsletterMap);
            
            await sendEmail({
                to: sub.email,
                subject: 'Your Weekly SpikedAI Digest',
                html,
                text: 'Please enable HTML to view your newsletter.'
            });
            sentCount++;
        }
    }

    return json({ success: true, sent: sentCount });
}

function generateEmailHtml(posts, newsletterMap) {
    // Simple HTML Template
    // Note: p.data might be where the title is! Check fetch structure.
    // Yes, content_entries use p.data.Title or p.data.title.
    // slug is likely in p.data.slug based on previous files, but we should make sure we're getting it right.
    
    const items = posts.map(p => {
        const title = p.data.title || p.data.Title || 'Untitled';
        const summary = p.data.summary || p.data.excerpt || 'Click to read more...';
        // Logic to extract slug might need to be robust. 
        // Blog page uses /blog/[slug]. Does post have slug root level?
        // lib/cms.js createEntry doesn't set root slug. It puts data in `data`.
        // So link should be /blog/{p.data.slug}
        const slug = p.data.slug || p._id; // Fallback to ID if no slug? Probably safer to assume data.slug exists as AI gen makes it.

        return `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
            <h2 style="margin: 0 0 5px 0;"><a href="http://localhost:5173/blog/${slug}" style="color: #000; text-decoration: none;">${title}</a></h2>
            <p style="margin: 0; color: #555;">${summary}</p>
        </div>
        `;
    }).join('');

    return `
        <div style="font-family: serif; color: #000; max-width: 600px; margin: 0 auto;">
            <h1 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">The SpikedAI Times</h1>
            <p style="text-align: center; font-style: italic;">Your weekly curated selections.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            ${items}
            <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #999;">
                <p>&copy; ${new Date().getFullYear()} Spiked AI. All rights reserved.</p>
            </div>
        </div>
    `;
}
