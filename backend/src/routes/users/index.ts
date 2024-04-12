import { Request, Response } from "express";
import Tokenchecker from "../../middlewares/auth/Tokenchecker.js";
import { router } from "../index.js";



router.post("/getuser",Tokenchecker,(req:Request,res:Response)=>{

    return res.status(200).send(req.body.userdata)

})



export default router