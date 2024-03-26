import User from "../../models/userModel.js";
import { comparePasswords } from "../../utils/PasswordUtils.js";
async function CheckLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send("missing email or password - all fields are required").status(400);
    }
    // find the user 
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid details");
        }
        const Ispasswordmatch = await comparePasswords(password, user.password);
        if (Ispasswordmatch) {
            // i will do other stuff like generating token and respinsing abck with header added a token
            res.setHeader("Authkey", "yaamaalik4321?");
        }
        else {
            return res.status(401).send("Authentication Fieled you have //certain number of tries   please check your credentials before trying again or request password reset");
        }
    }
    catch (error) {
        return res.status(500).send("An error accured while processing the request : ERR CODE 44576" + error);
    }
    next();
}
export default CheckLogin;
