import { getDb } from '$lib/db';
import { fail } from '@sveltejs/kit';
import sanitize from 'mongo-sanitize';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        const firstName = sanitize(formData.get('Name_First'));
        const lastName = sanitize(formData.get('Name_Last'));
        const company = sanitize(formData.get('SingleLine'));
        const companyUrl = sanitize(formData.get('SingleLine2'));
        const email = sanitize(formData.get('Email'));
        const phoneCode = sanitize(formData.get('PhoneNumber_countrycodeval'));
        const phoneNumber = sanitize(formData.get('PhoneNumber_countrycode'));
        const referral = sanitize(formData.get('SingleLine1'));
        const message = sanitize(formData.get('MultiLine'));

        // Basic validation (standard ZOHO fields were mandatory)
        if (!firstName || !lastName || !company || !companyUrl || !email || !phoneNumber || !message) {
            return fail(400, { missing: true });
        }

        try {
            const db = await getDb();
            const contactSubmissions = db.collection('contact_submissions');
            
            await contactSubmissions.insertOne({
                firstName,
                lastName,
                company,
                companyUrl,
                email,
                phone: `${phoneCode} ${phoneNumber}`,
                referral,
                message,
                submittedAt: new Date(),
                source: 'contact-sales-page'
            });

            return { success: true };
        } catch (error) {
            console.error('Database insertion error:', error);
            return fail(500, { error: 'Failed to save submission. Please try again later.' });
        }
    }
};
