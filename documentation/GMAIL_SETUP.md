# Gmail API Integration Setup Guide

This guide will help you set up Gmail API to send emails from your Google Workspace account when users submit the contact form.

## Prerequisites

- Google Workspace account with admin access
- Node.js installed
- Access to Google Cloud Console

## Step-by-Step Setup

### 1. Install Required Dependencies

```bash
npm install googleapis open
```

### 2. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API:
   - Navigate to **APIs & Services** → **Library**
   - Search for "Gmail API"
   - Click **Enable**

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **Internal** (recommended for Google Workspace) or **External**
3. Fill in the required information:
   - **App name**: SpikedAI Contact Form
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click **Save and Continue**
5. On the **Scopes** page, click **Add or Remove Scopes**
6. Add the following scope:
   - `https://www.googleapis.com/auth/gmail.send`
7. Click **Update** and **Save and Continue**
8. Review and click **Back to Dashboard**

### 4. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: SpikedAI Gmail Integration
   - **Authorized redirect URIs**: Add `http://localhost:3000/oauth2callback`
5. Click **Create**
6. **Download the JSON file** or copy the **Client ID** and **Client Secret**

### 5. Get Your Refresh Token

1. Open `scripts/get-gmail-token.js` and update the following:
   ```javascript
   const CLIENT_ID = 'your-client-id-here.apps.googleusercontent.com';
   const CLIENT_SECRET = 'your-client-secret-here';
   ```

2. Run the authentication script:
   ```bash
   node scripts/get-gmail-token.js
   ```

3. Your browser will open automatically
4. Sign in with your Google Workspace account
5. Grant the requested permissions
6. The script will display your credentials in the terminal

### 6. Configure Environment Variables

1. Copy the output from the previous step
2. Add to your `.env` file:
   ```env
   GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   GMAIL_USER_EMAIL=noreply@yourdomain.com
   SALES_NOTIFICATION_EMAIL=sales@yourdomain.com
   ```

   **Important:**
   - `GMAIL_USER_EMAIL`: The email address you authenticated with (will be the "From" address)
   - `SALES_NOTIFICATION_EMAIL`: Where you want to receive contact form notifications

### 7. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact-sales`
3. Fill out and submit the form
4. Check your `SALES_NOTIFICATION_EMAIL` inbox for the notification

## How It Works

1. **User submits form** → Data is validated and sanitized
2. **Save to MongoDB** → Submission is stored in the database
3. **Send email via Gmail API** → Notification is sent to your sales team
4. **Success response** → User sees confirmation message

## Email Template

The integration sends a beautifully formatted HTML email with:
- Contact information (name, company, email, phone)
- Company website
- How they found you
- Their message/business details
- Submission timestamp

## Troubleshooting

### "Invalid credentials" error
- Verify your Client ID and Client Secret are correct
- Make sure you copied the entire refresh token

### "Insufficient permissions" error
- Ensure you added the `gmail.send` scope in OAuth consent screen
- Re-run the authentication script with `prompt: 'consent'`

### Email not sending
- Check server logs for detailed error messages
- Verify `GMAIL_USER_EMAIL` matches the authenticated account
- Ensure Gmail API is enabled in Google Cloud Console

### "Token has been expired or revoked"
- Re-run `scripts/get-gmail-token.js` to get a new refresh token
- Update your `.env` file with the new token

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment variables** - Never hardcode credentials
3. **Restrict OAuth scopes** - Only use `gmail.send`, not full Gmail access
4. **Use Internal OAuth** - If using Google Workspace, set consent screen to "Internal"
5. **Monitor API usage** - Check Google Cloud Console for unusual activity

## Production Deployment

When deploying to production (e.g., Vercel, Netlify):

1. Add all environment variables to your hosting platform
2. Update OAuth redirect URIs in Google Cloud Console to include production URLs
3. Consider setting up email delivery monitoring
4. Implement rate limiting to prevent abuse

## Additional Features (Optional)

### Auto-reply to User
Add this to `+page.server.js` after sending the notification:

```javascript
// Send confirmation email to user
await sendEmail({
    to: email,
    subject: 'Thanks for contacting SpikedAI!',
    html: generateUserConfirmationEmail(submissionData)
});
```

### Email Delivery Tracking
Store the Gmail message ID returned from `sendEmail()` in MongoDB:

```javascript
const emailResult = await sendEmail({...});
await contactSubmissions.updateOne(
    { _id: insertResult.insertedId },
    { $set: { emailMessageId: emailResult.messageId } }
);
```

## Support

If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure Gmail API is enabled and OAuth is configured properly
4. Review Google Cloud Console audit logs

---

**Last Updated**: January 2026
