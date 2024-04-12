import { error, log } from "console";
import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "dotenv";
config();

interface Payload {
  type: string;
  user_id: string | undefined;
  message?: string;
}

type TokenType = "access";

class TokenUtils {
  // generate tokens based on type like access token  or any other type just check when init class

  private secretKey: string | undefined;
  private options: SignOptions;
  private type: TokenType;

  constructor(type: TokenType) {

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

  public generateToken = (data:any) => {
    switch (this.type) {
      case "access":
        return this.generateAccessToken(data);
      default:
        throw new Error("Token type not found");
    }
  };

  public verifyToken = (token: string): Payload => {
    log(token)
    if (this.secretKey == undefined) {
      throw new Error("JWT secret key is not defined.");
    } else {
      try {
        const decoded = jwt.verify(token, this.secretKey) as Payload;
        return {
          type: decoded.type,
          user_id: decoded.user_id,
        
        };
      } catch (error) {
        console.error("Token verification failed:", error);
        return {
          type: "error",
          user_id: undefined,
          message: "Invalid token",
        }
      }
    }
  }

  private generateAccessToken(data: Payload): string {
    if (this.secretKey == undefined) {
      throw new Error("JWT secret key is not defined.");
    } else {
      try {
        const token: string = jwt.sign({
          user_id: data.user_id
        
        }, this.secretKey, this.options);
        return token;
      } catch (error) {
        console.error("Token generation failed:", error);
        throw new Error("Token generation failed.");
      }
    }
  }
}


export default TokenUtils;