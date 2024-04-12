import { NextFunction, Request, Response } from "express";
import { LoginFields } from "../../@types/auth";
import mongoose from "mongoose";
import User from "../../models/userModel.js";
import { comparePasswords } from "../../utils/PasswordUtils.js";
import { log } from "console";


async  function CheckLogin(req: Request, res: Response,next:NextFunction) {
    
  const {email,password}=req.body as LoginFields

  log(email,password)

  if (!email || !password ){
    return res.send("missing email or password - all fields are required").status(400)
  }

  // find the user 

   try {
    const user= await User.findOne({email:email})
    if (!user){
        return res.status(401).json({
          type:"error",
            message:"we could not find a user with the provided email address",
        
        })
    }
    log(password,user.password)

    const Ispasswordmatch=  await   comparePasswords(password,user.password)
    log(Ispasswordmatch)
    if (Ispasswordmatch){
        req.body.userid=user.userId
        // i will do other stuff like generating token and respinsing abck with header added a token
    //   req.body.userId=user.userId
    //     if (user?.security?.hastwoFactorAuth){
    //         // check if the user has verified his email and phone number
    //         if (user?.security?.isverified?.email || user?.security?.isverified?.phonenumber){
    //             return res.status(200).send("Two Factor Auth is enabled")
    //         }
    //         else{
    //             return res.status(401).send("Two Factor Auth is enabled but you have not verified your email and phone number")
    //         }
    //     }
    //     else{
    //         return res.status(200).send("Login Successful")
    //     }
      
    }
    else{
      log(password)
        return res.status(401).json({
            type:"error",
            message:"Invalid password provided",
        }) 
    }

    

    
   } catch (error) {

    return res.status(500).send("An error accured while processing the request : ERR CODE 44576"+error)
    
   }
 


next()
     

    
}

export default CheckLogin;
