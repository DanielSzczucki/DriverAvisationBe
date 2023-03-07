import { Router } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt, { Jwt, JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "../utils/config";
export const homeRouter = Router();

homeRouter
  .get("/", (req, res) => {
    res.json({
      greet: "hello!",
    });
  })

  .post("/login", (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (email === config.email && password === config.password) {
      const accesToken = jwt.sign(
        {
          id: config.id,
          name: config.username,
        },
        config.JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: config.id,
          name: config.username,
        },
        config.JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ accesToken, refreshToken });
    } else {
      res.status(406).json({
        message: "Invalid credentials",
      });
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
