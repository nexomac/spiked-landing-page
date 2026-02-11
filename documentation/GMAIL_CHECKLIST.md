# Gmail API Setup Checklist

Use this checklist to ensure you've completed all steps correctly.

## ✅ Setup Checklist

### Google Cloud Console
- [ ] Created/selected a Google Cloud project
- [ ] Enabled Gmail API
- [ ] Configured OAuth consent screen
- [ ] Added `gmail.send` scope
- [ ] Created OAuth 2.0 Client ID (Web application)
- [ ] Added redirect URI: `http://localhost:3000/oauth2callback`
- [ ] Downloaded/copied Client ID and Client Secret

### Local Setup
- [ ] Installed dependencies: `npm install googleapis open`
- [ ] Updated `scripts/get-gmail-token.js` with Client ID and Secret
- [ ] Ran authentication script: `node scripts/get-gmail-token.js`
- [ ] Successfully authenticated in browser
- [ ] Copied refresh token from terminal output

### Environment Variables
- [ ] Created/updated `.env` file
- [ ] Added `GMAIL_CLIENT_ID`
- [ ] Added `GMAIL_CLIENT_SECRET`
- [ ] Added `GMAIL_REFRESH_TOKEN`
- [ ] Added `GMAIL_USER_EMAIL` (your Google Workspace email)
- [ ] Added `SALES_NOTIFICATION_EMAIL` (where to receive notifications)

### Testing
- [ ] Started dev server: `npm run dev`
- [ ] Navigated to `/contact-sales`
- [ ] Submitted test form
- [ ] Checked server logs for success message
- [ ] Verified email received at `SALES_NOTIFICATION_EMAIL`

## 🔧 Quick Commands

```bash
# Install dependencies
npm install googleapis open

# Get refresh token
node scripts/get-gmail-token.js

# Start dev server
npm run dev

# Test the form
# Navigate to: http://localhost:5173/contact-sales
```

## 📧 Environment Variables Template

```env
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
GMAIL_USER_EMAIL=noreply@yourdomain.com
SALES_NOTIFICATION_EMAIL=sales@yourdomain.com
```

## ❓ Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Double-check Client ID, Secret, and Refresh Token |
| "Insufficient permissions" | Ensure `gmail.send` scope is added in OAuth consent |
| "Token expired" | Re-run `get-gmail-token.js` to get new refresh token |
| Email not sending | Check server logs, verify `GMAIL_USER_EMAIL` is correct |

## 📚 Documentation

- Full setup guide: `GMAIL_SETUP.md`
- Gmail API docs: https://developers.google.com/gmail/api
- OAuth 2.0 guide: https://developers.google.com/identity/protocols/oauth2

---

**Need help?** Check `GMAIL_SETUP.md` for detailed troubleshooting.
