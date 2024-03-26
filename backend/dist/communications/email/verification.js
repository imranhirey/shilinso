import markdownIt from 'markdown-it';
import { log } from 'console';
import { readFile } from './utils.local/index.js';
import Handlebars from 'handlebars';
import { transporter } from './index.js';
export async function sendVerificationLink() {
    const md = markdownIt();
    const file = {
        name: 'verifications'
    };
    const content = readFile({ name: 'verifications' });
    // Define dynamic content
    const context = {
        link: 'https://example.com/verify',
        name: 'Imran',
        // Add more dynamic content as needed
        additionsal_text: "thank for using our service "
    };
    // Compile Markdown templates and inject dynamic content
    const compiledHeader = Handlebars.compile(md.render(content))(context);
    log(compiledHeader);
    const finalHtml = `${compiledHeader}`;
    // Define email options
    const mailOptions = {
        from: 'Shilinso Verifications Team <verifications@shilinso.co.uk>',
        to: 'imrannurhirey@icloud.com',
        subject: 'Verification Team',
        html: finalHtml // Set the HTML content
    };
    try {
        await transporter.sendMail(mailOptions);
        return {
            sent: true,
            message: "Email sent successfully"
        };
    }
    catch (error) {
        console.error("Error sending email:", error);
        return {
            sent: false,
            message: "Failed to send email"
        };
    }
}
