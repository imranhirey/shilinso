import { Router } from "express";
import { Emailverificationprocessor } from "../../middlewares/verifications/Emailverificationprocessor.js";
import { Emailverificationchecker } from "../../middlewares/verifications/Emailverificationchecker.js";


let router = Router(); 


//@ts-ignore
router.post("/email",Emailverificationprocessor)
router.post("/email/:userid",Emailverificationchecker)


export default router;
