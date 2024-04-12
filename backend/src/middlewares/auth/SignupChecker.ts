import { NextFunction, Request, Response } from "express";
import { hashPassword, validatePassword } from "../../utils/PasswordUtils.js";
import validator from 'validator';
import { log } from "console";
import { SignupFields } from "../../@types/auth.js";
import { secureHeapUsed } from "crypto";

function CheckSignup(req: Request, res: Response, next: NextFunction) {
  
    const sendBadRequestRes = (message: string) => {
        return res.status(400).send(message).end();
    }

    let data: SignupFields = req.body;
    if (!data) {
        return sendBadRequestRes("User info is missing in the request body");
    }
    const requiredFields = ['firstName', 'lastName', 'email', 'dateOfBirth', 'password']; // Add all the fields that are required

   let missingFields: string[] = [];
    requiredFields.forEach(field => {
        if (!data.hasOwnProperty(field)) {
            missingFields.push(field);
        }
    });
    if (missingFields.length > 0) {
        return res.status(400).send({ error: "Missing required fields", missingFields });
    }

    // Validate email
    if (!validator.isEmail(data.email)) {
        return sendBadRequestRes("Email is invalid");
    }

    // Validate date of birth
    // if (!validator.isDate(data.dateOfBirth.toString())) {
    //     return sendBadRequestRes("Date of birth is invalid");
    // }

    // Validate password strength
  
    const passworderrors= validatePassword(data.password)
    if (passworderrors.length>0) {
        return sendBadRequestRes(passworderrors.toString());
    }

    // Validate gender if provided
    const validGenders = ["male","female"];
    if (data.gender && !validGenders.includes(data.gender)) {
        return sendBadRequestRes("Invalid gender");
    }

    
     // checking if there is something called israel in the request body as country or ip origin
    const ErrorIsral ="Access Restricted || State (Israel Not Allowed)  - "
     const usercountry=data.country

     if (usercountry && usercountry ==="Israel"){
          return res.status(403).send(ErrorIsral) 

          // block the ip

          const ip=req.body?.ip

        //   secureHeapUsed (ip) 

        
        
     }
     

     
    // Hash the password
    hashPassword(data.password)
        .then((hashedPassword) => {
            req.body.password = hashedPassword;
            next();
        })
        .catch((err) => {
            res.status(500).send("Server error - password hashing");
        });
}

export default CheckSignup;
