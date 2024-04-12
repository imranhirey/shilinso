import { config } from "dotenv";
import { Genrateuserid } from "../../utils/Idgenerator.js";
import User from "../../models/userModel.js";
config();
class UserController {
    usertype;
    constructor(usertype) {
        this.usertype = usertype;
    }
    async saveNewUser(user) {
        return this.usertype === "personal"
            ? this.personalAccount(user)
            : this.businessAccount();
    }
    log(message, ...args) {
        if (process.env.ENV === "development") {
            console.log(message, ...args);
        }
    }
    async personalAccount(incomingUserData) {
        console.log("personal account commin", incomingUserData);
        try {
            const userData = {
                ...incomingUserData,
                userId: Genrateuserid(),
            };
            const user = new User(userData);
            const savedUser = await user.save();
            return {
                type: "success",
                data: {
                    userid: savedUser.userId,
                },
            };
        }
        catch (error) {
            // Log or handle the error appropriately
            console.error("Error saving user:", error);
            return {
                type: "error",
                data: "Failed to register user",
            };
        }
    }
    async businessAccount() {
        this.log("Creating business account");
        return {
            type: "error",
            data: "Business account creation is not implemented",
        };
    }
}
export default UserController;
