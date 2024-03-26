//UN OPTIMIZED CODE


import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import { log } from "console";
import { config } from "dotenv";
import { verifyToken } from "../../utils/TokenUtils.js";
config();

export const Emailverificationchecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
        //@ts-ignore

    const userid = verifyToken(req.params.token).user_id

    const filter = { userId: userid };
    const user = await User.findOne(filter);


    // Update the user's email verification status
    const update = { $set: { "security.isverified.email": true } };
    const result = await User.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      // If no document was modified, send an error response
      return res.status(500).send(`
        <html>
          <head>
            <title>Email Verification Error</title>
          </head>
          <body style="text-align: center; background-color: #fff3e0; color: #f57c00;">
            <h1>No need email verification</h1>
            <p>It seems your email has already been verified. Please close the tab; refreshing the page will not make any changes.</p>
          </body>
        </html>
      `);
    }

    // If the email verification was successful, send a success response
    return res.send(`
      <html>
        <head>
          <title>Email Verification Success</title>
        </head>
        <body style="text-align: center; background-color: #e8f5e9; color: #43a047;">
          <h1>Email Verification Successful</h1>
          <p>Your email has been updated successfully.</p>
        </body>
      </html>
    `);
  } catch (err) {
    // If an error occurred during processing, send an error response
    return res.status(404).send(`
    <html>
      <head>
        <title>Email Verification Error</title>
      </head>
      <body style="text-align: center; background-color: #ffebee; color: #d32f2f;">
        <h1>BAD LINK</h1>
        <p>we can't find the resourcses you are looking for | to verify your email click the link in your email .</p>
      </body>
    </html>
  `);
  }
};
