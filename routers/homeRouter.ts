import { Router } from "express";
import { hash, compare } from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "../utils/config";
import { UserRecord } from "../record/user.record";
import { ValidationError } from "../utils/errors";
import {
  CreateUserReq,
  DataStoredInToken,
  TokenData,
} from "../types/user/user";
import { User } from "../types/user";

export const homeRouter = Router();

homeRouter
  .get("/", (req, res) => {
    res.json({
      greet: "hello! test",
    });
  })

  .post("/register", async (req, res) => {
    const userData = req.body as CreateUserReq;
    console.log("req.body:", req.body);

    // const userData = per;

    const user = await UserRecord.getOne(userData.email);
    console.log("user", user);

    //if exist
    if (user) {
      res.json({
        message: "Such a user already exists",
      });
      return new ValidationError(`User ${userData.email} arleady exist`);
    } else {
      const hashedPass = await hash(userData.password, 10);
      console.log("password", hashedPass);

      const newUser = new UserRecord({
        ...userData,
        password: hashedPass,
      });

      await newUser.insert();
      res.json({
        message: `User ${newUser.name} was created`,
      });
    }
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await UserRecord.getOne(email);
    console.log("user login route", user);

    const createToken = (user: UserRecord, expirationInMinutes: number) => {
      const expiresIn = expirationInMinutes * 60 * 1000;
      const secret = config.JWT_SECRET;
      const dataStoredInToken: DataStoredInToken = {
        id: user.id,
      };

      return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
      };
    };

    const createCookie = (tokenData: TokenData) => {
      return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    };

    if (user) {
      const isPasswordMatch = await compare(password, user.password);

      if (isPasswordMatch) {
        const token = createToken(user, 5);
        const cookie = createCookie(token);

        res
          .setHeader("Set-Cookie", cookie)

          .json({
            ...user,
            password: undefined,
            message: "succes",
          });
      } else {
        res.status(406).json({ message: "Invalid Credential" });
        throw new ValidationError("Something is wrong here");
      }
    } else {
      res.status(406).json({ message: "Invalid Credential" });
      throw new ValidationError("Something is wrong here");
    }
  })

  .post("/refresh", (req, res) => {
    if (req.cookies?.jwt) {
      const refreshToken = req.cookies.jwt;
      console.log(req.cookies.jwt);

      // console.log(refreshToken);

      jwt.verify(
        refreshToken,
        config.REFRESH_SECRET,
        (err: VerifyErrors, decoded: Jwt | JwtPayload | string) => {
          if (err) {
            return res.status(406).json({
              message: "Unauthorized",
            });
          } else {
            const accestToken = jwt.sign(
              {
                email: config.email,
              },
              config.JWT_SECRET,
              {
                expiresIn: "5m",
              }
            );
            return res.json({ accestToken });
          }
        }
      );
    } else {
      return res.status(406).json({
        message: "Unauthorized",
      });
    }
  });
