import { error } from "console";
import jwt, { SignOptions } from "jsonwebtoken";

interface Payload {
  user_id: string;
}

const secretKey: string | undefined = process.env.JWT_SECRETKEY;

if (!secretKey) {
  throw new Error("JWT secret key is not defined.");
}

const options: SignOptions = { expiresIn: "1h" };

export function generateToken(data: Payload): string {
  if (secretKey == undefined) {
    throw new Error("JWT secret key is not defined.");
  } else {
    try {
      const token: string = jwt.sign(data, secretKey, options);
      return token;
    } catch (error) {
      console.error("Token generation failed:", error);
      throw new Error("Token generation failed.");
    }
  }
}

export function verifyToken(token: string) {
  let secretkey = process.env.JWT_SECRETKEY?.toString();
  if (!secretKey) {
    throw new Error("secret ke is missing");
  } else {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error("Token verification failed.");
    }
  }
}
