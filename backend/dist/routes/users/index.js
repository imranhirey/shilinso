import { Router } from "express";
import Tokenchecker from "../../middlewares/auth/Tokenchecker.js";
const router = Router();
router.post("/getuser", Tokenchecker, (req, res) => {
    return res.status(200).send(req.body.userdata);
});
export default router;
