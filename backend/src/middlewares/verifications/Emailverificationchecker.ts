import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import { Usertype } from "../../@types/user.js";
import { log } from "console";

export const emailverificationchecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userid = req.body.userid;
  log(userid);
  let user = await User.findOne({ userId: userid });
  if (user?.security?.isverified?.email == true) {
    return res
      .status(400)
      .send("Then email associated with your account has been already verified")
      .end();
  }


};
