import jwt from "jsonwebtoken";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    OneTimeID: string;
    Role: string;
  
  };
}

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  OneTimeID: string;
  Role: string;
  
}

interface verifyTokenResult {
 id: string;
 name: string;
 email: string;
 OneTimeID: string;
 Role: string;
 password: string;

}

export const generateToken = (
  tokenData : {
    id: string,
    name: string,
    email: string,
    OneTimeID: string,
    userVerified: boolean
  }
) => {
  return jwt.sign(
    {
      id : tokenData.id,
      name : tokenData.name,
      email : tokenData.email,
      OneTimeID : tokenData.OneTimeID,
      userVerified : tokenData.userVerified

    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export const GenerateVerifyToken = (
  tokenData : {
    id: string,
    name: string,
    email: string,
    OneTimeID: string,
    Role: string
    password: string
  }
) => {
  return jwt.sign(
    {
      id : tokenData.id,
      name : tokenData.name,
      email : tokenData.email,
      OneTimeID : tokenData.OneTimeID,
      Role : tokenData.Role,
      password : tokenData.password
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
}
