import { getDb } from '$lib/db';
import { fail } from '@sveltejs/kit';
import sanitize from 'mongo-sanitize';
import { sendEmail, generateContactEmailHTML, generateContactEmailText, sendCustomerConfirmation } from '$lib/gmail';
import { SALES_NOTIFICATION_EMAIL } from '$env/static/private';

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

        const submissionData = {
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
        };

        try {
            // Save to MongoDB
            const db = await getDb();
            const contactSubmissions = db.collection('contact_submissions');
            
            await contactSubmissions.insertOne(submissionData);

            // Send email notification via Gmail API
            try {
                // CC/BCC arrays for internal notification (customize as needed)
                const internalCC = []; // e.g., ['sales@spikedai.com']
                const internalBCC = []; // e.g., ['archive@spikedai.com']
                
                // Send internal notification
                await sendEmail({
                    to: SALES_NOTIFICATION_EMAIL,
                    subject: `New Sales Inquiry from ${company}`,
                    html: generateContactEmailHTML(submissionData),
                    text: generateContactEmailText(submissionData),
                    cc: internalCC,
                    bcc: internalBCC
                });
                
                console.log('Internal email notification sent successfully');
                
                // CC/BCC arrays for customer confirmation (customize as needed)
                const customerCC = []; // e.g., ['sales@spikedai.com']
                const customerBCC = []; // e.g., ['archive@spikedai.com']
                
                // Send customer confirmation with PDF attachment
                await sendCustomerConfirmation({
                    to: email,
                    firstName: firstName,
                    cc: customerCC,
                    bcc: customerBCC
                });
                
                console.log('Customer confirmation email sent successfully');
            } catch (emailError) {
                // Log email error but don't fail the submission
                console.error('Failed to send email notification:', emailError);
                // You might want to add this to a retry queue or alert system
            }

            return { success: true };
        } catch (error) {
            console.error('Database insertion error:', error);
            return fail(500, { error: 'Failed to save submission. Please try again later.' });
        }
    }
};
