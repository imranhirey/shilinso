import { Router } from "express";
import { emailverificationchecker } from "../../middlewares/verifications/Emailverificationchecker.js";
let router = Router();
//@ts-ignore
router.post("/email", emailverificationchecker);
export default router;
