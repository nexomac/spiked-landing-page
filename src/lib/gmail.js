import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    GMAIL_USER_EMAIL
} from '$env/static/private';

/**
 * Create and configure OAuth2 client for Gmail API
 */
function getOAuth2Client() {
    const oauth2Client = new google.auth.OAuth2(
        GMAIL_CLIENT_ID,
        GMAIL_CLIENT_SECRET,
        'http://localhost:5173' // Not used for refresh token flow
    );

    oauth2Client.setCredentials({
        refresh_token: GMAIL_REFRESH_TOKEN
    });

    return oauth2Client;
}

/**
 * Create email message in RFC 2822 format with support for CC, BCC, and attachments
 */
function createMessage(to, subject, body, isHtml = true, cc = [], bcc = [], attachments = []) {
    const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const messageParts = [
        `From: ${GMAIL_USER_EMAIL}`,
        `To: ${to}`
    ];
    
    // Add CC if provided
    if (cc.length > 0) {
        messageParts.push(`Cc: ${cc.join(', ')}`);
    }
    
    // Add BCC if provided
    if (bcc.length > 0) {
        messageParts.push(`Bcc: ${bcc.join(', ')}`);
    }
    
    messageParts.push(`Subject: ${subject}`);
    messageParts.push('MIME-Version: 1.0');
    
    // If we have attachments, use multipart/mixed
    if (attachments.length > 0) {
        messageParts.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
        messageParts.push('');
        
        // Add the text/html body part
        messageParts.push(`--${boundary}`);
        messageParts.push(`Content-Type: ${isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`);
        messageParts.push('');
        messageParts.push(body);
        messageParts.push('');
        
        // Add each attachment
        attachments.forEach(attachment => {
            messageParts.push(`--${boundary}`);
            messageParts.push(`Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`);
            messageParts.push('Content-Transfer-Encoding: base64');
            messageParts.push(`Content-Disposition: attachment; filename="${attachment.filename}"`);
            messageParts.push('');
            messageParts.push(attachment.data);
            messageParts.push('');
        });
        
        messageParts.push(`--${boundary}--`);
    } else {
        // Simple message without attachments
        messageParts.push(`Content-Type: ${isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`);
        messageParts.push('');
        messageParts.push(body);
    }

    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return encodedMessage;
}

/**
 * Send email using Gmail API
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} options.text - Plain text email body (optional)
 * @param {Array<string>} options.cc - CC email addresses (optional)
 * @param {Array<string>} options.bcc - BCC email addresses (optional)
 * @param {Array<Object>} options.attachments - Attachments (optional)
 * @returns {Promise<Object>} - Gmail API response
 */
export async function sendEmail({ to, subject, html, text, cc = [], bcc = [], attachments = [] }) {
    try {
        const oauth2Client = getOAuth2Client();
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const encodedMessage = createMessage(
            to, 
            subject, 
            html || text, 
            !!html,
            cc,
            bcc,
            attachments
        );

        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        });

        console.log('Email sent successfully:', response.data.id);
        return { success: true, messageId: response.data.id };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

/**
 * Generate HTML email template for contact form submission (internal notification)
 */
export function generateContactEmailHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
        }
        .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #dc2626;
        }
        .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .field-value {
            color: #111827;
            font-size: 16px;
        }
        .message-box {
            background: white;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .badge {
            display: inline-block;
            background: #fef2f2;
            color: #dc2626;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <div class="badge">SpikedAI Sales Inquiry</div>
    </div>
    
    <div class="content">
        <div class="field">
            <div class="field-label">Contact Name</div>
            <div class="field-value">${data.firstName} ${data.lastName}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${data.company}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Company Website</div>
            <div class="field-value">
                <a href="${data.companyUrl}" style="color: #dc2626; text-decoration: none;">
                    ${data.companyUrl}
                </a>
            </div>
        </div>
        
        <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">
                <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">
                    ${data.email}
                </a>
            </div>
        </div>
        
        <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${data.phone}</div>
        </div>
        
        ${data.referral ? `
        <div class="field">
            <div class="field-label">How They Found Us</div>
            <div class="field-value">${data.referral}</div>
        </div>
        ` : ''}
        
        <div class="message-box">
            <div class="field-label">Business Details & Message</div>
            <div class="field-value" style="white-space: pre-wrap; margin-top: 10px;">
                ${data.message}
            </div>
        </div>
        
        <div class="footer">
            <p>Submitted on ${new Date(data.submittedAt).toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short'
            })}</p>
            <p style="margin-top: 10px; font-size: 12px;">
                This is an automated notification from your SpikedAI contact form.
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Generate plain text version of contact email (internal notification)
 */
export function generateContactEmailText(data) {
    return `
NEW CONTACT FORM SUBMISSION - SpikedAI Sales Inquiry

Contact Information:
--------------------
Name: ${data.firstName} ${data.lastName}
Company: ${data.company}
Website: ${data.companyUrl}
Email: ${data.email}
Phone: ${data.phone}
${data.referral ? `How They Found Us: ${data.referral}` : ''}

Business Details & Message:
---------------------------
${data.message}

Submitted: ${new Date(data.submittedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
})}

---
This is an automated notification from your SpikedAI contact form.
    `.trim();
}

/**
 * Generate customer confirmation email (HTML with plain text appearance)
 */
export function generateCustomerConfirmationEmail(firstName) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        a {
            color: #dc2626;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <p>Hi ${firstName},</p>
    <br>
    <p>Thank you for your interest in SpikedAI.</p>
    <p>Our team is currently reviewing your inquiry and will provide a detailed response shortly. Should you require immediate assistance, please don't hesitate to reach out to us directly.</p>
    <p>We value your time and appreciate it as we work to address your request thoroughly.</p>
    <p>Best,</p>
    <p>Avi</p>
    <p>Spiked.AI</p>
    <p><a href="mailto:aispiked@gmail.com">aispiked@gmail.com</a></p>
</body>
</html>`;
}

/**
 * Send customer confirmation email with PDF attachment
 * @param {Object} options - Email options
 * @param {string} options.to - Customer email address
 * @param {string} options.firstName - Customer first name
 * @param {Array<string>} options.cc - CC email addresses (optional)
 * @param {Array<string>} options.bcc - BCC email addresses (optional)
 * @returns {Promise<Object>} - Gmail API response
 */
export async function sendCustomerConfirmation({ to, firstName, cc = [], bcc = [] }) {
    try {
        // Read the PDF file
        const pdfPath = 'static/SpikedAI - Solution Overview.pdf';
        const pdfBuffer = await readFile(pdfPath);
        const pdfBase64 = pdfBuffer.toString('base64');

        // Prepare attachment
        const attachments = [{
            filename: 'SpikedAI - Solution Overview.pdf',
            mimeType: 'application/pdf',
            data: pdfBase64
        }];

        // Generate email body
        const emailBody = generateCustomerConfirmationEmail(firstName);

        // Send email
        return await sendEmail({
            to,
            subject: 'Thank You for Your Interest in SpikedAI',
            html: emailBody,
            cc,
            bcc,
            attachments
        });
    } catch (error) {
        console.error('Error sending customer confirmation:', error);
        throw new Error(`Failed to send customer confirmation: ${error.message}`);
    }
}
