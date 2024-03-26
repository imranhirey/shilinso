import { NextFunction, Request, Response } from "express";
import { LoginFields, RegFields } from "../../@types/auth";
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
        return res.status(401).send({
            message:"Authentication Failed",
            error:"unf"
        
        })
    }
    log(user)

    const Ispasswordmatch=  await   comparePasswords(password,user.password)
    log(Ispasswordmatch)
    if (Ispasswordmatch){
        // i will do other stuff like generating token and respinsing abck with header added a token
       if (!user.security?.isverified?.email){
        res.set("route","/auth/emailverification")
       }
      
    }
    else{
        return res.status(401).send("Authentication Fieled you have //certain number of tries   please check your credentials before trying again or request password reset") 
    }

    

    
   } catch (error) {

    return res.status(500).send("An error accured while processing the request : ERR CODE 44576"+error)
    
   }
 


next()
     

    
}

export default CheckLogin;
