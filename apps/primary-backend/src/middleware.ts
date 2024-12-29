import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const token: string = req.headers.authorization as unknown as string; //we forcelly typecast it to string
    const payload = jwt.verify(token, JWT_PASSWORD) as { id: string };
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (err) {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
};
