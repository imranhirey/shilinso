import { Router } from "express";
import { Emailverificationprocessor } from "../../middlewares/verifications/Emailverificationprocessor.js";
import { Emailverificationchecker } from "../../middlewares/verifications/Emailverificationchecker.js";


let router = Router(); 


//@ts-ignore
router.get("/email/:token",Emailverificationchecker)
router.post("/email",Emailverificationprocessor)


export default router;
