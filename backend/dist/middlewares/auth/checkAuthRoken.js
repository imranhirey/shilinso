import TokenUtils from "../../utils/TokenUtils.js";
export const CheckAuthToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).send("Access Denied");
    // check if the token is valid
    const tokenutills = new TokenUtils("access");
    const isvalid = tokenutills.verifyToken(token);
    return res.send(isvalid).end();
};
