import { JwtPayload, verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { NextFunction, Request, Response } from "express";
import { UserRecord } from "../record/user.record";
import { ValidationError } from "./errors";

interface MyRequest extends Request {
  user?: { id: string; name: string };
}

// const secretKey = config.JWT_SECRET;
//jwt werification middleware

export const authToken = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  // console.log("jwt cookie", req.cookies);
  const cookies = req.cookies;

  if (cookies && cookies.Authorization) {
    try {
      const jwtSecretKey = config.JWT_SECRET;
      const verificationRes = verify(
        cookies.Authorization,
        jwtSecretKey
      ) as JwtPayload;
      const user = await UserRecord.getOneById(verificationRes.id);

      if (!user) {
        res.status(403).json({
          message: "Something went wrong in authentication",
        });
        throw new ValidationError("Wrong user id");
      } else {
        next();
      }
    } catch (e) {
      console.error("Something went wrong in authentication", e);
      res.status(403).json({
        message: "Something went wrong in authentication",
      });
    }
  }
};

//fn for first ver auth using react auth kit
// export const authToken = (
//   req: MyRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("jwt cookie", req.cookies);
//   const authHeader = req.headers["authorization"];

//   const token = authHeader.split(" ")[1];

//   console.log("auth token", token);

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, config.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user as { id: string; name: string };
//     next();
//   });
// };
