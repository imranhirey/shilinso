import { config } from "dotenv";
import { Generatewalletid, Genrateuserid } from "../../utils/Idgenerator.js";
import User from "../../models/userModel.js";
import { SignupFields } from "../../@types/auth.js";
import Wallet from "../../models/walletModal.js";

config();

type UserType = "personal" | "business";
type Response = {
  type: "error" | "success";
  data: string | Object;
};

class UserController {
  private usertype: UserType;

  constructor(usertype: UserType) {
    this.usertype = usertype;
  }

  public async saveNewUser(user: any): Promise<Response> {
    return this.usertype === "personal"
      ? this.personalAccount(user)
      : this.businessAccount();
  }

  private log(message: string, ...args: any[]) {
    if (process.env.ENV === "development") {
      console.log(message, ...args);
    }
  }

  private async personalAccount(
    incomingUserData: SignupFields
  ): Promise<Response> {
    console.log("personal account commin", incomingUserData);
    try {

      // create wallet for user
      const userId= Genrateuserid();
      const walletid= Generatewalletid();
      const wallet={
          walletId:walletid,
          name:"default",
          userId:userId,
          transactions:[],
          createdDate:new Date(),
          status:"pending",
          balance:0
      }

       
      const userData:any = {
        ...incomingUserData,
        userId: userId      };
           
      const user = new User(userData);  
      const savedUser = await user.save();
      await new Wallet(wallet).save();
      user.Walletid=walletid;
      await user.save();
      this.log("User saved successfully");
      
      
      return {
        type: "success",
        data: {
          userid: savedUser.userId,
        },
      };
    } catch (error) {
      // Log or handle the error appropriately
      console.error("Error saving user:", error);
      return {
        type: "error",
        data: "Failed to register user",
      };
    }
  }

  private async businessAccount(): Promise<Response> {
    this.log("Creating business account");
    return {
      type: "error",
      data: "Business account creation is not implemented",
    };
  }
}

export default UserController;
