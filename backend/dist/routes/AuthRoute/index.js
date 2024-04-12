import { Router } from "express";
import Signup from "./Signup.js";
import CheckSignup from "../../middlewares/auth/SignupChecker.js";
import Login from "./Login.js";
import CheckLogin from "../../middlewares/auth/LoginChecker.js";
import { AuthTokenChecker } from "../../middlewares/Tokenchecker.js";
import { CheckAuthToken } from "../../middlewares/auth/checkAuthRoken.js";
let router = Router();
//@ts-ignore
router.post("/signup", CheckSignup, Signup);
router.post("/login", CheckLogin, Login);
router.post("/checktoken", AuthTokenChecker, CheckAuthToken);
export default router;
