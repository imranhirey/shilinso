import { Request, Response } from "express";
import User from "../../models/userModel.js";

function Signup(req: Request, res: Response) {
 

    let user=new User({
        ...req.body
    })

    user.save().then((user)=>{
        res.send("user has been accepted and saved successfullyu")
    })
    .catch((err)=>{
        res.status(500).send("oops! cant save the user => "+err)
    })
}

export default Signup;
