import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = "hello";
export const getDataFromToken = (token:string) => {
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    return {id:decodedToken.id,email:decodedToken.email,role:decodedToken?.role};
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const generate_jwt = (record: Record<string, string>, role: "contractor"|"department") => {
  return jwt.sign({ ...record, role }, JWT_SECRET);
};
