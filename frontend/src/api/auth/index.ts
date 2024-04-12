import { AxiosResponse } from "axios";
import axiosInstance from "..";

type AutheType = {
  email: string;
  password: string;
};


type Res = {
  iserror: boolean;
  message: string;
  data?:any
};

// set base url 'http://localhost:3001/auth'
import axios from 'axios';
import UserInfo from "@/interfaces/Signup";
axios.defaults.baseURL = "http://192.168.0.24:3001";
// Define status codes
const STATUS_OK = 200;
const STATUS_TOO_MANY_REQUESTS = 429;
const STATUS_UNAUTHORIZED = 401;

// Set validateStatus as a default
axios.defaults.validateStatus = function (status) {
  return status < 500; // Resolve only if the status code is less than 500
};

export class Auth {
  constructor() {
    console.log('Auth');
  }

  login = async (data: AutheType) : Promise<Res> => {
    try {
      const response = await axios.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === STATUS_OK) {
        return {
          iserror: false,
          message: "Successfully logged in",
          data:response.data
        };
      } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
        return {
          iserror: true,
          message: response.data.message || "Too many requests. Please try again later",
        };
      } else if (response.status === STATUS_UNAUTHORIZED) {
        return {
          iserror: true,
          message: response.data.message || "Invalid credentials",
        };
      } else {
        return {
          iserror: true,
          message: response.data.message || "An error occurred during login",
        };
      }
    } catch (err) {
      console.log("treated as error");
      return {
        iserror: true,
        message: "A network error occurred during login. Please try again later",
      };
    }
  };

    signup = async (data:UserInfo) : Promise<Res> => {
        console.log(data)
        try {
        const response = await axios.post("/auth/signup", {
            firstName:data.firstName,
            middleName:data.middleName,
            lastName:data.lastName,
            email:data.email,
            phoneNumber:data.phoneNumber,
            country:data.country,
            city:data.city,
            dateOfBirth:data.dateOfBirth,
            password:data.password,
            confirmPassword:data.confirmPassword,
            
        });

        console.log(response)
    
        if (response.status === STATUS_OK) {
            // set userid to localstorage
            localStorage.setItem("userid", response.data.userid);
            return {
            iserror: false,
            message: "Successfully signed up",
            };
        } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
            return {
            iserror: true,
            message: response.data.message || "Too many requests. Please try again later",
            };
        } else {
            return {
            iserror: true,
            message: response.data.message || "An error occurred during signup",
            };
        }
        } catch (err) {
        console.log("treated as error");
        return {
            iserror: true,
            message: "A network error occurred during signup. Please try again later",
        };
        }
    };
    sendVerificationEmail = async (userid:string) : Promise<Res> => {
        try {
        const response = await axios.post("/verify/email", {
            userid
        });

        if (response.status === STATUS_OK) {
            return {
            iserror: false,
            message: "Successfully sent verification email",
            };
        } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
            return {
            iserror: true,
            message: response.data.message || "Too many requests. Please try again later",
            };
        } else {
            return {
            iserror: true,
            message: response.data.message || "An error occurred during sending verification email",
            };
        }
        } catch (err) {
        console.log("treated as error");
        return {
            iserror: true,
            message: "A network error occurred during sending verification email. Please try again later",
        };
        }
    }


    verifyOtp = async (userid:string,otp:string) : Promise<Res> => {
        try {
        const response = await axios.post("/verify/email/"+userid, {
            otp
        });

        console.log(response)

        if (response.status === STATUS_OK) {
            return {
            iserror: false,
            message: "Your email has been verified successfully",
            };
        } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
            return {
            iserror: true,
            message: response.data.message || "Too many requests. Please try again later",
            };
        } else {
            return {
            iserror: true,
            message: response.data.message || "An error occurred during verifying otp",
            };
        }
        } catch (err) {
        console.log("treated as error");
        return {
            iserror: true,
            message: "A network error occurred during verifying otp. Please try again later",
        };
        }
    }

    getuserithToken = async (token:string) : Promise<Res> => {
        try {
        const response = await axios.post("/users/getuser", {
            token
        });
        
        console.log(response)

        if (response.status === STATUS_OK) {
            return {
            iserror: false,
            message: "Successfully get user",
            data:response.data
            };
        } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
            return {
            iserror: true,
            message: response.data.message || "Too many requests. Please try again later",
            };
        } else {
            return {
            iserror: true,
            message: response.data.message || "An error occurred during getting user",
            };
        }
        } catch (err) {
           
   
        console.log("treated as error");
        return {
            iserror: true,
            message: "A network error occurred during getting user. Please try again later",
        };
        }
    }


    checkToken = async (token:string) : Promise<Res> => {
        try {
        const response = await axios.post("/auth/checktoken",{},{
            headers:{
                "auth-token":token
            }
        });

        console.log(response)

        if (response.status === STATUS_OK) {
            return {
            iserror: false,
            message: "Successfully verified token",
            };
        } else if (response.status === STATUS_TOO_MANY_REQUESTS) {
            return {
            iserror: true,
            message: response.data.message || "Too many requests. Please try again later",
            };
        } else {
            return {
            iserror: true,
            message: response.data.message || "An error occurred during verifying token",
            };
        }
        } catch (err) {
        console.log("treated as error");
        return {
            iserror: true,
            message: "A network error occurred during verifying token. Please try again later",
        };
        }
    }
  }



