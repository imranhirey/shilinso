import { Router } from "express";
import { Emailverificationprocessor } from "../../middlewares/verifications/Emailverificationprocessor.js";
import { emailVerificationChecker } from "../../middlewares/verifications/Emailverificationchecker.js";
let router = Router();
//@ts-ignore
router.post("/email", Emailverificationprocessor);
router.post("/email/:userid", emailVerificationChecker);
export default router;
