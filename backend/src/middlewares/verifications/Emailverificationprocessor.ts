import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import { log } from "console";
import { generateToken } from "../../utils/TokenUtils.js";
import {config} from "dotenv"
import { sendVerificationLink } from "../../communications/email/verification.js";
config()

export const Emailverificationprocessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

 
   const token= generateToken({
    user_id:userid
   })
   const verificationlink= process.env.APP_BACKENDURL+"/verify/email/"+token

   await sendVerificationLink({
    from:"Shilinso Verifications Departmenet",
    link:verificationlink,
    name:user.firstName,
    subject:"Verify your email address",
    to:user.email
   })
   return res.status(200).send("An email with the verification link has been sent to your email "+user.email)
  } catch (error) {
    console.error("Error occurred during email verification:", error);
    return res.status(500).send("Internal Server Error");
  }
};
