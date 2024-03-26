import { NextFunction, Request, Response } from "express";
import { RegFields } from "../../@types/auth";
import { hashPassword, validatePassword } from "../../utils/PasswordUtils.js";
import validator from 'validator';
import { log } from "console";

function CheckSignup(req: Request, res: Response, next: NextFunction) {
    interface Incommindata {
        firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    country: string,
    email: string,
    dateOfBirth: string,
    password: string,
    city: string,
    confirmPassword: string
    }

    const sendBadRequestRes = (message: string) => {
        return res.status(400).send(message).end();
    }

    let data: Incommindata = req.body;
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
    const validGenders = ['male', 'female', 'other'];
    if (data.gender && !validGenders.includes(data.gender)) {
        return sendBadRequestRes("Invalid gender");
    }

    // Additional validations can be added for other fields as needed

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
