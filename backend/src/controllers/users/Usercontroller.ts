import { config } from "dotenv";
import { RegFields } from "../../@types/auth";
import { Genrateuserid } from "../../utils/Idgenerator.js";
import User from "../../models/userModel.js";

config();

type UserType = "personal" | "business";
type Response = {
    type: "error" | "success",
    data: string | null
}

class UserController {
    private usertype: UserType;

    constructor(usertype: UserType) {
        this.usertype = usertype;
    }

    public async saveNewUser(user: any): Promise<Response> {
        return this.usertype === "personal" ? this.personalAccount(user) : this.businessAccount();
    }

    private log(message: string, ...args: any[]) {
        if (process.env.ENV === "development") {
            console.log(message, ...args);
        }
    }

    private async personalAccount(incomingUserData: RegFields): Promise<Response> {
        try {
            const userData = {
                ...incomingUserData,
                userId: Genrateuserid(),
                
            };

            const user = new User(userData);
            const savedUser = await user.save();
            return {
                type: "success",
                data: "User saved successfully"
            };
        } catch (error) {
            // Log or handle the error appropriately
            console.error("Error saving user:", error);
            return {
                type: "error",
                data: "Failed to register user"
            };
        }
    }

    private async businessAccount(): Promise<Response> {
        this.log("Creating business account");
        return {
            type: "error",
            data: "Business account creation is not implemented"
        };
    }
}

export default UserController;
