import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
class TokenUtils {
    // generate tokens based on type like access token  or any other type just check when init class
    secretKey;
    options;
    type;
    constructor(type) {
        if (type == undefined) {
            throw new Error("Token type is not defined.");
        }
        if (process.env.JWT_SECRETKEY == undefined) {
            throw new Error("JWT secret key is not defined.");
        }
        this.type = type;
        this.secretKey = process.env.JWT_SECRETKEY;
        this.options = { expiresIn: "200h" };
    }
    // i am calling function based on type of token i want to generate in generatetoken function
    generateToken = (data) => {
        switch (this.type) {
            case "access":
                return this.generateAccessToken(data);
            default:
                throw new Error("Token type not found");
        }
    };
    verifyToken = (token) => {
        if (this.secretKey == undefined) {
            throw new Error("JWT secret key is not defined.");
        }
        else {
            try {
                const decoded = jwt.verify(token, this.secretKey);
                return decoded;
            }
            catch (error) {
                console.error("Token verification failed:", error);
                throw new Error("Token verification failed.");
            }
        }
    };
    generateAccessToken(data) {
        if (this.secretKey == undefined) {
            throw new Error("JWT secret key is not defined.");
        }
        else {
            try {
                const token = jwt.sign({
                    user_id: data.user_id
                }, this.secretKey, this.options);
                return token;
            }
            catch (error) {
                console.error("Token generation failed:", error);
                throw new Error("Token generation failed.");
            }
        }
    }
}
export default TokenUtils;
