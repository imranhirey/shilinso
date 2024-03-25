import fs from 'fs';
import markdownIt from 'markdown-it';
import handlebars from 'handlebars';
import nodemailer from "nodemailer"
import { log } from 'console';
// Create Markdown parser



export function sendhee(){
  console.log("curent path ",process.cwd());

const md = markdownIt();

// Read Markdown templates
const ver = fs.readFileSync('./src/communications/email/ver.md', 'utf8');

// Define dynamic content
const context = {
  verificationLink: 'https://exaple.com/verify',
  name: 'Imran',
  // Add more dynamic content as needed
};

// Compile Markdown templates and inject dynamic content
const compiledHeader = handlebars.compile(md.render(ver))(context);


// Combine templates
const finalHtml = `${compiledHeader}`;

// Send the finalHtml using Nodemailer...
const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 465, // or 587 for TLS
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'verifications@shilinso.co.uk',
      pass: 'yaaraxiim4321?' // Please ensure this is your correct password
    }
  });
  
  // Define email options
  const mailOptions = {
    from: 'Shilinso Verifications Team <verifications@shilinso.co.uk>',
    to: 'imrannurhirey@icloud.com',
    subject: 'Verification Team',
    html: finalHtml // Set the HTML content
  };
  
  // Send the email

try {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  })
  
} catch (error) {
  log(error)
  
}
  
  }