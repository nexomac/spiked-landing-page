import nodemailer from 'nodemailer';

// Create a reusable transporter object using the default SMTP transport
// For development, we use Ethereal.email (auto-generated test account)
let transporter;

async function createTransporter() {
    if (transporter) return transporter;

    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    
    console.log("Mail Transporter Initialized with:", testAccount.user);
    return transporter;
}

export async function sendEmail({ to, subject, html, text }) {
    try {
        const transport = await createTransporter();

        const info = await transport.sendMail({
            from: '"Spiked CMS" <system@spiked.ai>', // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
        return { success: true, messageId: info.messageId, preview: nodemailer.getTestMessageUrl(info) };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
}
