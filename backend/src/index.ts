 import { log } from "console"
import {GetCountriesList, Getcitiesbycountry} from "./data/countries.js"
import { rateLimit } from 'express-rate-limit'

const app = express();
app.use(bodyParser({
  limit:"50mb"
}))
import {config} from "dotenv"
config()

 import express, { Request, Response } from 'express';
 app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
  next();
});


sendhee()


 import dataroute from "./routes/data/index.js"
 import auth from "./routes/AuthRoute/index.js"
 import verifications from "./routes/verificationsRoute/index.js"



import connectDB from "./database/connection.js";
import bodyParser from "body-parser";
import { AuthTokenChecker } from "./middlewares/Tokenchecker.js";
import { sendhee } from "./communications/email/index.js";
 const port =process.env.BACKEND_PORT
 const apiLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   message: 'Too many requests from this IP, please try again after 15 minutes',
 });



// END  
 app.use("/*",apiLimiter)
 app.use("/get",dataroute)
 app.use("/auth",auth)
 app.use("/verify",verifications)
//  app.get("/protected",AuthTokenChecker,(req,res)=>{
//   res.send("ok")
// })

 app.listen(port, async () => {
  let connection=await connectDB()

   console.log(`Server running on port ${port}`);
 });

 

