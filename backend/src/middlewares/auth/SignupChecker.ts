import { NextFunction, Request, Response } from "express";
import { RegFields } from "../../@types/auth";
import { hashPassword } from "../../utils/PasswordUtils.js";

 function CheckSignup(req: Request, res: Response,next:NextFunction) {
    let data: RegFields = req.body;
    const requiredFields = ['country', 'username', 'email','dateOfBirth','password','gender','phoneNumber','city','lastName','firstName']; // Add all the fields that are required

    let missingFields: string[] = [];
    requiredFields.forEach(field => {
        if (!data.hasOwnProperty(field)) {
            missingFields.push(field);
        }
    });
    if (missingFields.length > 0) {
        return res.status(400).send({ error: "Missing required fields", missingFields });
    }
    // hash the password
 hashPassword(data.password).then((hashPassword)=>{
    req.body.password=hashPassword
    next()



 })
 .catch((err)=>{
    res.status(500).send("server error - password hashing")
 })

     

    
}

export default CheckSignup;
