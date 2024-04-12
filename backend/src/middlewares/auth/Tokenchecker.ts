import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel.js";
import TokenUtils from "../../utils/TokenUtils.js";





const Tokenchecker = async (req: Request, res: Response, next: NextFunction) => {

    // get the token from the body
    const token = req.body.token    
    if (!token) {
        return res.status(401).send("No token provided")
    }
    
    // check if the token is valid

    const tokenutils=new TokenUtils("access")
    try {
        const payload = tokenutils.verifyToken(token)
        const userid=payload.user_id
        // get userinfo withouit password
        const userdata= await User.findOne({
            userId:userid
        },{password:0})
        if (!userdata){
            return res.status(401).send("Invalid token")
        }
        // add the user data to the request object
        req.body.userdata=userdata
        
        next()
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
}


export default Tokenchecker