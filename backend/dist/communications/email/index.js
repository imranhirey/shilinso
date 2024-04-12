// in the env file
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { log } from "console";
config();
const mailHost = process.env.MAIL_HOST?.toString();
const mailPort = process.env.MAIL_PORT;
const mailUser = process.env.MAIL_USER?.toString();
const mailPassword = process.env.MAIL_PASSWORD?.toString();
log("mail host is ", mailHost);
export const transporter = nodemailer.createTransport({
    host: `${mailHost}`,
    port: 465,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPassword,
    },
});
