import Usercontroller from "../../controllers/users/Usercontroller.js";
async function Signup(req, res) {
    try {
        const userController = new Usercontroller("personal");
        const response = await userController.saveNewUser(req.body);
        if (response.type === "error") {
            return res.status(400).send(response.data);
        }
        else {
            // Depending on your application logic, you might send a success response here
            return res.status(200).send(response.data);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
export default Signup;
