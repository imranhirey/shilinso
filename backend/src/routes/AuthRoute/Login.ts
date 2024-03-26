import { Request, Response } from "express";
import User from "../../models/userModel.js";
import { generateToken } from "../../utils/TokenUtils.js";

function Login(req: Request, res: Response) {
  let token=  generateToken({
   user_id:req.body.userid
  })
  res.set("route","/auth/emailverification")

   res.send(token).status(200)
   res.end()
}

export default Login;
