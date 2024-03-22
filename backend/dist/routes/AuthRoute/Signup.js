import User from "../../models/userModel.js";
import { Genrateuserid } from "../../utils/Idgenerator.js";
import Usercontroller from "../../controllers/users/Usercontroller.js";
import { log } from "console";
function Signup(req, res) {
    req.body.userId = Genrateuserid();
    try {
        let userk = new Usercontroller("business");
        userk.savenewuser();
    }
    catch (error) {
        log(error);
    }
    let user = new User({
        ...req.body
    });
    user.save().then((user) => {
        res.send("user has been accepted and saved successfullyu");
    })
        .catch((err) => {
        res.status(500).send("oops! cant save the user => " + err);
    });
}
export default Signup;
