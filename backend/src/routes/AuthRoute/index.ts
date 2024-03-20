import { Response, Router } from "express";
import Signup from "./Signup.js";
import CheckSignup from "../../middlewares/auth/SignupChecker.js";
import Login from "./Login.js";
import CheckLogin from "../../middlewares/auth/LoginChecker.js";

let router = Router(); 


//@ts-ignore
router.post("/signup",CheckSignup, Signup); 
router.post("/login",CheckLogin, Login); 

export default router;
