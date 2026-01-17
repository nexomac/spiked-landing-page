import { google } from 'googleapis';
import http from 'http';
import { URL } from 'url';
import open from 'open';

// Replace these with your OAuth credentials from Google Cloud Console

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Generate the auth URL
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force to get refresh token
});

console.log('\nGmail API Authentication Setup\n');
console.log('═══════════════════════════════════════════════════════════════');
console.log('\nCOPY THIS URL AND PASTE IT IN YOUR GOOGLE WORKSPACE BROWSER:\n');
console.log(authUrl);
console.log('\n═══════════════════════════════════════════════════════════════\n');
console.log('Steps:');
console.log('1. Copy the URL above');
console.log('2. Paste it in the browser where you\'re logged into Google Workspace');
console.log('3. Authorize the application');
console.log('4. You will be redirected back to localhost:5173\n');
console.log('Server is listening on port 5173...\n');

// Try to open in default browser (but user can ignore and use their own)
try {
    await open(authUrl);
    console.log('Attempted to open in default browser');
    console.log('  (If wrong browser opened, just use the URL above instead)\n');
} catch (error) {
    console.log('Could not auto-open browser - please copy the URL above manually\n');
}

// Create a local server to handle the OAuth callback
const server = http.createServer(async (req, res) => {
    if (req.url.indexOf('/auth/callback') > -1) {
        const qs = new URL(req.url, REDIRECT_URI).searchParams;
        const code = qs.get('code');
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Authentication Successful</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        text-align: center;
                        max-width: 500px;
                    }
                    h1 { color: #10b981; margin: 0 0 20px 0; }
                    p { color: #6b7280; line-height: 1.6; }
                    .checkmark {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: #10b981;
                        margin: 0 auto 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 48px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="checkmark">✓</div>
                    <h1>Authentication Successful!</h1>
                    <p>You can close this window and return to the terminal.</p>
                    <p>Your refresh token will be displayed in the terminal.</p>
                </div>
            </body>
            </html>
        `);
        
        try {
            const { tokens } = await oauth2Client.getToken(code);
            
            console.log('\nAuthentication successful!\n');
            console.log('═══════════════════════════════════════════════════════════════');
            console.log('\nAdd these to your .env file:\n');
            console.log('GMAIL_CLIENT_ID=' + CLIENT_ID);
            console.log('GMAIL_CLIENT_SECRET=' + CLIENT_SECRET);
            console.log('GMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
            console.log('GMAIL_USER_EMAIL=your-email@yourdomain.com');
            console.log('SALES_NOTIFICATION_EMAIL=sales@yourdomain.com');
            console.log('\n═══════════════════════════════════════════════════════════════\n');
            
            setTimeout(() => {
                server.close();
                process.exit(0);
            }, 1000);
        } catch (error) {
            console.error('\nError getting tokens:', error.message);
            server.close();
            process.exit(1);
        }
    }
});

server.listen(5173, () => {
    // Server started message already printed above
});
