import User from "../../models/userModel.js";
import { log } from "console";
import { config } from "dotenv";
import { sendVerificationLink } from "../../communications/email/verification.js";
import { generateOTP } from "../../utils/otpcode.js";
config();
export const Emailverificationprocessor = async (req, res, next) => {
    const userid = req.body.userid;
    log(userid);
    try {
        const filter = { userId: userid };
        const user = await User.findOne(filter);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (user.security && user.security.isverified && user.security.isverified.email) {
            return res.status(400).send("The email associated with your account has already been verified");
        }
        const otp = generateOTP(6);
        // updae the user with the otp
        const update = { $set: { "security.otp": otp } };
        const result = await User.updateOne(filter, update);
        if (result.modifiedCount === 0) {
            return res.status(500).send("Internal Server Error");
        }
        await sendVerificationLink({
            from: "Shilinso Verifications Departmenet",
            link: otp,
            name: user.firstName,
            subject: "Verify your email address",
            to: user.email
        });
        return res.status(200).send("An email with the verification link has been sent to your email " + user.email);
    }
    catch (error) {
        console.error("Error occurred during email verification:", error);
        return res.status(500).send("Internal Server Error");
    }
};
