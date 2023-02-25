import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";
export const homeRouter = Router();

homeRouter
  .get("/", (req, res) => {
    res.json({
      greet: "hello!",
    });
  })

  .post("/login", (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (email !== config.email) {
      return res
        .status(400)
        .json({ message: "Email or password does not match" });
    }

    if (password !== config.password) {
      return res
        .status(400)
        .json({ message: "Email or password does not match" });
    }

    const jwtToken = jwt.sign(
      {
        id: config.id,
        email: config.email,
      },
      config.JWT_SECRET
    );

    res.json({ message: "Welcome", token: jwtToken });
  });
