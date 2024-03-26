import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 465, // or 587 for TLS
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'verifications@shilinso.co.uk',
        pass: 'yaaraxiim4321?' // Please ensure this is your correct password
    }
});
