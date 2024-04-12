import { NextFunction, Request, Response } from "express";
import TokenUtils from "../../utils/TokenUtils.js";
import { log } from "console";

export const CheckAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  log("Token: ", token);
  if (!token) return res.status(401).send("Access Denied");

  log("Token: ", token);

  // check if the token is valid
  try {
    const tokenutills = new TokenUtils("access");
    const isvalid = tokenutills.verifyToken(token);
    log("isvalid: ", isvalid);
    return res.send(isvalid).end();
  } catch (error) {
    log("Error: ", error);
    return res.status(400).send("Invalid Token");
  }

};
