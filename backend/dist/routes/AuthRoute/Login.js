import { generateToken } from "../../utils/TokenUtils.js";
function Login(req, res) {
    let token = generateToken({
        user_id: req.body.userid
    });
    res.send(token).status(200);
    res.end();
}
export default Login;
