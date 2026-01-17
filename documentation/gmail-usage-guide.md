# Gmail API Usage Guide

## Overview
The `src/lib/gmail.js` module now supports:
- Plain text and HTML emails
- CC and BCC recipients
- File attachments (including PDFs)
- Customer confirmation emails with PDF attachment

## New Features

### 1. CC and BCC Support
You can now send emails with CC and BCC recipients:

```javascript
import { sendEmail } from '$lib/gmail';

await sendEmail({
    to: 'customer@example.com',
    subject: 'Your Subject',
    html: '<p>Your HTML content</p>',
    cc: ['cc1@example.com', 'cc2@example.com'],
    bcc: ['bcc1@example.com', 'bcc2@example.com']
});
```

### 2. Customer Confirmation Email
A new function `sendCustomerConfirmation` sends a professional confirmation email with the Solution Overview PDF attached:

```javascript
import { sendCustomerConfirmation } from '$lib/gmail';

await sendCustomerConfirmation({
    to: 'customer@example.com',
    firstName: 'John',
    cc: ['sales@spikedai.com'],  // Optional
    bcc: ['archive@spikedai.com']  // Optional
});
```

This will send an email with:
- Subject: "Thank You for Your Interest in SpikedAI"
- Professional plain-text-style HTML body
- Hyperlinked email address (aispiked@gmail.com)
- Attached PDF: "SpikedAI - Solution Overview.pdf"

### 3. Email Template
The customer confirmation email contains:

```
Hi [FirstName],

Thank you for your interest in SpikedAI.

Our team is currently reviewing your inquiry and will provide a detailed response shortly. 
Should you require immediate assistance, please don't hesitate to reach out to us directly.

We value your time and appreciate it as we work to address your request thoroughly.

Best,

Avi

Spiked.AI

aispiked@gmail.com (as hyperlink)
```

## Example: Contact Form Integration

Here's how to integrate this into your contact form handler:

```javascript
import { sendEmail, sendCustomerConfirmation, generateContactEmailHTML } from '$lib/gmail';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const formData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            company: data.get('company'),
            // ... other fields
        };

        // Send internal notification
        await sendEmail({
            to: 'aispiked@gmail.com',
            subject: 'New Contact Form Submission',
            html: generateContactEmailHTML(formData),
            cc: ['sales@spikedai.com'],  // Optional
            bcc: []  // Optional
        });

        // Send customer confirmation with PDF
        await sendCustomerConfirmation({
            to: formData.email,
            firstName: formData.firstName,
            cc: [],  // Optional
            bcc: ['archive@spikedai.com']  // Optional
        });

        return { success: true };
    }
};
```

## Attachment Format

To send custom attachments, use this format:

```javascript
const attachments = [{
    filename: 'document.pdf',
    mimeType: 'application/pdf',
    data: base64EncodedString  // Base64 encoded file content
}];

await sendEmail({
    to: 'customer@example.com',
    subject: 'Your Document',
    html: '<p>Please find attached...</p>',
    attachments
});
```

## Notes
- The PDF is automatically read from `static/SpikedAI - Solution Overview.pdf`
- CC and BCC arrays default to empty arrays if not provided
- The email address in the signature is clickable (mailto link)
- All emails use proper MIME multipart formatting when attachments are included
