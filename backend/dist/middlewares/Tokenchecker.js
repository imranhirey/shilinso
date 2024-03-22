import { log } from "console";
import { verifyToken } from "../utils/TokenUtils.js";
export function AuthTokenChecker(req, res, next) {
    let token = req.headers.authtoken;
    if (!token) {
        return res.status(401).send("Unauthenticated 401");
    }
    try {
        let tokenisvalid = verifyToken(token);
        log("i am check auth keys", tokenisvalid);
    }
    catch (error) {
        return res.status(400).send("Access denied").end();
    }
    next();
}
