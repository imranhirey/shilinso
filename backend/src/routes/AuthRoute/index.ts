import { Response, Router } from "express";
import Signup from "./Signup.js";
import CheckSignup from "../../middlewares/auth/SignupChecker.js";
import Login from "./Login.js";
import CheckLogin from "../../middlewares/auth/LoginChecker.js";
import { CheckAuthToken } from "../../middlewares/auth/checkAuthRoken.js";
import { router } from "../index.js";


//@ts-ignore
router.post("/signup", CheckSignup, Signup);
router.post("/login", CheckLogin, Login);
router.post("/checktoken", CheckAuthToken, CheckAuthToken);


export default router;
