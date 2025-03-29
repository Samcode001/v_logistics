import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "../config";

// Define an extended request type to include userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as { shipperId: string };
    req.userId = decoded.shipperId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
