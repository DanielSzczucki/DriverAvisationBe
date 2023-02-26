import jwt from "jsonwebtoken";
import { config } from "./config";
import { NextFunction, Request, Response } from "express";

interface MyRequest extends Request {
  user?: { id: string; name: string };
}

// const secretKey = config.JWT_SECRET;
//jwt werification middleware

export const authToken = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as { id: string; name: string };
    next();
  });
};
