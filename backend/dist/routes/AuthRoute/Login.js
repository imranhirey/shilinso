import TokenUtils from "../../utils/TokenUtils.js";
function Login(req, res) {
    const tokenutils = new TokenUtils("access");
    console.log(req.body);
    let token = tokenutils.generateToken({
        user_id: req.body.userid
    });
    res.json({
        type: "success",
        token: token
    }).status(200);
    res.end();
}
export default Login;
