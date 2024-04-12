import { Emailverificationprocessor } from "../../middlewares/verifications/Emailverificationprocessor.js";
import { emailVerificationChecker } from "../../middlewares/verifications/Emailverificationchecker.js";
import { router } from "../index.js";




//@ts-ignore
router.post("/email",Emailverificationprocessor)
router.post("/email/:userid",emailVerificationChecker)


export default router;
