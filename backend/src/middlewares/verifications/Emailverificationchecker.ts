import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import { log } from "console";
import { config } from "dotenv";
config();

export const emailVerificationChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.otp) {
      return res.status(400).json({
        type: "error",
        message: "OTP code is required",
      });
    }

    if (!req.params.userid) {
      return res.status(400).json({
        type: "error",
        message: "User ID is required",
      });
    }
    const userId = req.params.userid;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({
        type: "error",
        message: "User not found",
      });
    }

    if (user.security?.isverified?.email) {
      return res.status(400).json({
        type: "error",
        message: "The email associated with your account has already been verified",
      });
      
    }

    if (!user.security?.otp) {
      return res.status(200).json({
        type: "error",
        message: "No OTP code found",
      })
    }

    if (user.security?.otp !== req.body.otp) {
      return res.status(401).json({
        type: "error",
        message: "Invalid OTP code",
      
        
      })
    }

    const update = {
      $set: {
        "security.isverified.email": true,
        "security.otp": null,
      },
    };

    const result = await User.updateOne({ userId }, update);

    if (result.modifiedCount === 0) {
      return res.status(500).json({
        type: "error",
        message: "Internal Server Error",
      });
    }

    return res.status(200).json({
      type: "success",
      message: "Email verified successfully",
    });

  } catch (err) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};
