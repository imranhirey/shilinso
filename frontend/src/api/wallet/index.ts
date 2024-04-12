/**
 * {
"walletId":"W103240",
"requesterId":"U933685",
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTkzMzY4NSIsImlhdCI6MTcxMjk1NjI0OCwiZXhwIjoxNzEzNjc2MjQ4fQ.10cCvxErU7TuLn5xZJJYanRLvLAns2Pf2Kvb1QB2F70"
}

 */

interface Res {
    iserror: boolean;
    message: string;
    data?: any;
    
}

import axios from 'axios';
import UserInfo from "@/interfaces/Signup";
axios.defaults.baseURL = "http://192.168.0.24:3001/wallet";
// Define status codes
const STATUS_OK = 200;
const STATUS_TOO_MANY_REQUESTS = 429;
const STATUS_UNAUTHORIZED = 401;

class Wallet {
  walletid: string;
  constructor(walletid: string) {
    this.walletid = walletid;
  }



  getwalletinfo = async (token: string,userid:string) : Promise<Res> =>{
    try {
      const response = await axios.post("/getwalletinfo", {
        walletId: this.walletid,
        requesterId: userid,
        token: token,
      });

      if (response.status === STATUS_OK) {
        return {
          iserror: false,
          message: "Successfully fetched wallet info",
          data: response.data,
        };
      } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
        return {
          iserror: true,
          message: response.data.message || "Too many requests. Please try again later",
        };
      } else if (response.status === STATUS_UNAUTHORIZED) {
        return {
          iserror: true,
          message: response.data.message || "Unauthorized",
        };
      } else {
        return {
          iserror: true,
          message: response.data.message || "An error occurred",
        };
      }
    } catch (error) {
      return {
        iserror: true,
        message:  "An error occurred",
      };
    }
  }
}



export default Wallet;