import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/TokenUtils.js";

export function AuthTokenChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authtoken;

  if (!token) {
    return res.status(401).send("Unauthenticated 401");
  }

  try {
    let tokenisvalid = verifyToken(token as string);
    log("i am check auth keys", tokenisvalid);
  } catch (error) {
    return res.status(400).send("Access denied").end();
  }

  next();
}
