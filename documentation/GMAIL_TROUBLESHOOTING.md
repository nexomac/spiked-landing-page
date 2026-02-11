# Gmail API Troubleshooting Guide

## Common Issues and Solutions

### 🔴 "Error: invalid_client"

**Cause:** Client ID or Client Secret is incorrect

**Solutions:**
1. Double-check you copied the entire Client ID and Secret from Google Cloud Console
2. Make sure there are no extra spaces or line breaks
3. Verify you're using the credentials from the correct project
4. Re-create OAuth credentials if needed

---

### 🔴 "Error: invalid_grant" or "Token has been expired or revoked"

**Cause:** Refresh token is invalid or expired

**Solutions:**
1. Re-run the authentication script:
   ```bash
   node scripts/get-gmail-token.js
   ```
2. Make sure to authenticate with the same Google account as `GMAIL_USER_EMAIL`
3. Update `.env` with the new refresh token
4. Restart your dev server

---

### 🔴 "Error: Insufficient Permission"

**Cause:** OAuth scope not configured correctly

**Solutions:**
1. Go to Google Cloud Console → APIs & Services → OAuth consent screen
2. Click "Edit App"
3. Go to "Scopes" section
4. Ensure `https://www.googleapis.com/auth/gmail.send` is added
5. Save changes
6. Re-run `get-gmail-token.js` to get a new token with correct scopes

---

### 🔴 Email Not Sending (No Error)

**Cause:** Environment variables not set or incorrect

**Solutions:**
1. Check `.env` file exists in project root
2. Verify all required variables are set:
   ```bash
   # On Windows (PowerShell)
   Get-Content .env
   
   # On Windows (Command Prompt)
   type .env
   ```
3. Restart your dev server after changing `.env`
4. Check server logs for detailed error messages

---

### 🔴 "Error: Gmail API has not been used in project"

**Cause:** Gmail API not enabled in Google Cloud Console

**Solutions:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to APIs & Services → Library
4. Search for "Gmail API"
5. Click "Enable"
6. Wait a few minutes for changes to propagate

---

### 🔴 "Error: redirect_uri_mismatch"

**Cause:** Redirect URI not configured in OAuth credentials

**Solutions:**
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", add:
   - `http://localhost:3000/oauth2callback`
4. Click "Save"
5. Re-run `get-gmail-token.js`

---

### 🔴 Form Submits But No Email Received

**Cause:** Email sent successfully but to wrong address or filtered

**Solutions:**
1. Check server logs for "✅ Email notification sent successfully"
2. Verify `SALES_NOTIFICATION_EMAIL` is correct in `.env`
3. Check spam/junk folder
4. Verify `GMAIL_USER_EMAIL` has permission to send emails
5. Check Gmail sent folder of `GMAIL_USER_EMAIL` account

---

### 🔴 "Error: Daily Limit Exceeded"

**Cause:** Gmail API quota exceeded

**Solutions:**
1. Check [Google Cloud Console Quotas](https://console.cloud.google.com/iam-admin/quotas)
2. Default limit is 100 emails/day for free tier
3. Request quota increase if needed
4. Implement rate limiting on your form

---

### 🔴 Browser Doesn't Open During Authentication

**Cause:** `open` package not working or browser blocked

**Solutions:**
1. Manually copy the URL from terminal and paste in browser
2. The URL will be displayed in the console
3. After authenticating, you'll be redirected to localhost:3000

---

### 🔴 "Cannot find module 'googleapis'"

**Cause:** Dependencies not installed

**Solutions:**
```bash
npm install googleapis open
```

---

### 🔴 Email Sends But Formatting Is Broken

**Cause:** HTML email not rendering correctly

**Solutions:**
1. Test with different email clients
2. Check if recipient's email client supports HTML
3. The plain text version will be used as fallback
4. Verify HTML template in `src/lib/gmail.js`

---

## Debugging Tips

### Enable Detailed Logging

Add this to `src/lib/gmail.js` in the `sendEmail` function:

```javascript
export async function sendEmail({ to, subject, html, text }) {
    console.log('📧 Attempting to send email...');
    console.log('To:', to);
    console.log('Subject:', subject);
    
    try {
        const oauth2Client = getOAuth2Client();
        console.log('✅ OAuth2 client created');
        
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        console.log('✅ Gmail API client created');
        
        const encodedMessage = createMessage(to, subject, html || text, !!html);
        console.log('✅ Message encoded');
        
        const response = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        });
        
        console.log('✅ Email sent successfully:', response.data.id);
        return { success: true, messageId: response.data.id };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
```

### Test Gmail API Connection

Create a test script `scripts/test-gmail.js`:

```javascript
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

try {
    const profile = await gmail.users.getProfile({ userId: 'me' });
    console.log('✅ Gmail API connection successful!');
    console.log('Email:', profile.data.emailAddress);
} catch (error) {
    console.error('❌ Gmail API connection failed:', error.message);
}
```

Run with:
```bash
node scripts/test-gmail.js
```

### Check Environment Variables

Create `scripts/check-env.js`:

```javascript
import dotenv from 'dotenv';
dotenv.config();

const required = [
    'GMAIL_CLIENT_ID',
    'GMAIL_CLIENT_SECRET',
    'GMAIL_REFRESH_TOKEN',
    'GMAIL_USER_EMAIL',
    'SALES_NOTIFICATION_EMAIL'
];

console.log('Checking environment variables...\n');

required.forEach(key => {
    const value = process.env[key];
    if (value) {
        console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    } else {
        console.log(`❌ ${key}: NOT SET`);
    }
});
```

---

## Still Having Issues?

1. **Check Google Cloud Console Logs:**
   - Go to Logging → Logs Explorer
   - Filter by Gmail API
   - Look for error messages

2. **Verify OAuth Consent Screen:**
   - Make sure it's published (not in testing mode for external users)
   - Verify your email is added as a test user if in testing mode

3. **Test with Gmail's Try This API:**
   - Go to [Gmail API Reference](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send)
   - Click "Try this method"
   - Test sending with your credentials

4. **Check Network Issues:**
   - Ensure your server can reach Google's APIs
   - Check firewall settings
   - Verify no proxy blocking requests

---

## Getting Help

If none of these solutions work:

1. Check server logs for the exact error message
2. Search the error message in [Stack Overflow](https://stackoverflow.com/questions/tagged/gmail-api)
3. Review [Gmail API documentation](https://developers.google.com/gmail/api)
4. Check [Google Workspace Status](https://www.google.com/appsstatus) for outages

---

**Last Updated:** January 2026
