import { AxiosResponse } from "axios";
import axiosInstance from "..";

type AutheType = {
    email: string;
    password: string;
}

type Res ={
    iserror:boolean;
    message:string;
    
}

// set base url 'http://localhost:3001/auth'





export class Auth {
    constructor() {
        console.log('Auth')
    }

   
    login = async (data: AutheType) : Promise<Res> => {
        try {
            const response = await axiosInstance.post("auth/login", {
                email: data.email,
                password: data.password,
            });

            
            return {
                iserror:false,
                message:"successfully logged in"
            }
        } catch (err) {
            return {
                iserror: true,
                message: "An error occurred during login please consider checking your credentials or try again letter",
            };
        }
    }
        
     
    }
