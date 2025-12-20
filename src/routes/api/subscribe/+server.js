import { getDb } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const data = await request.formData();
        const email = data.get('email');
        const newsletterId = data.get('newsletterId');

        if (!email || !newsletterId) {
            return json({ success: false, message: 'Email and newsletter ID required' }, { status: 400 });
        }

        const db = await getDb();
        const subscribers = db.collection('subscribers');

        // Check if subscriber exists
        const existing = await subscribers.findOne({ email });

        if (existing) {
            // Update existing subscription
            await subscribers.updateOne(
                { email },
                { $addToSet: { subscribedTo: newsletterId } } // No duplicates
            );
        } else {
            // Create new
            await subscribers.insertOne({
                email,
                subscribedTo: [newsletterId],
                createdAt: new Date()
            });
        }

        // Return generic success page or redirect
        // For strictly API usage, JSON is good. Since we used form action, redirect might be better, 
        // but let's return JSON and assume we'd enhance the UI to handle it or use progressive enhancement.
        // For this simple implementation, let's redirect back to referer or a success page.
        
        return new Response(null, {
            status: 303,
            headers: { Location: '/newsletters?success=true' }
        });

    } catch (e) {
        console.error(e);
        return json({ success: false, error: e.message }, { status: 500 });
    }
}
