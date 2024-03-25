import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import { log } from "console";
import { generateToken } from "../../utils/TokenUtils.js";
import {config} from "dotenv"
config()

export const emailverificationchecker = async (
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

    const update = { $set: { "security.isverified.email": true } };
    const result = await User.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      return res.status(404).send("Nothing updated");
    }
 
   const token= await generateToken({
    user_id:userid
   })
   const verificationlink= process.env.APP_BACKENDURL+"/verify/email/"+userid+"/"+token
   res.send("this is you verification link it should be sent to your email"+verificationlink).status(200).end()
  } catch (error) {
    console.error("Error occurred during email verification:", error);
    return res.status(500).send("Internal Server Error");
  }
};
