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

export const generateToken = (
  tokenData : {
    id: string,
    name: string,
    email: string,
    Role: string,
    OneTimeID: string
  }
) => {
  return jwt.sign(
    {
      id : tokenData.id,
      name : tokenData.name,
      email : tokenData.email,
      Role : tokenData.Role,
      OneTimeID : tokenData.OneTimeID
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
