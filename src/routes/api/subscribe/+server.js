import { getDb } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const data = await request.formData();
        const email = data.get('email');
        const newsletterIds = data.getAll('newsletterId');

        if (!email || !newsletterIds || newsletterIds.length === 0) {
            return json({ success: false, message: 'Email and at least one newsletter selection required' }, { status: 400 });
        }

        const db = await getDb();
        const subscribers = db.collection('subscribers');

        // Check if subscriber exists
        const existing = await subscribers.findOne({ email });

        if (existing) {
            // Update existing subscription
            await subscribers.updateOne(
                { email },
                { $addToSet: { subscribedTo: { $each: newsletterIds } } }
            );
        } else {
            // Create new
            await subscribers.insertOne({
                email,
                subscribedTo: newsletterIds,
                createdAt: new Date()
            });
        }

        return new Response(null, {
            status: 303,
            headers: { Location: '/blog?success=true' }
        });

    } catch (e) {
        console.error(e);
        return json({ success: false, error: e.message }, { status: 500 });
    }
}
