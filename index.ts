import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookiesession from "cookie-session";
import { homeRouter } from "./routers/homeRouter";
import { driverRouter } from "./routers/driverRouter";
import { loadRouter } from "./routers/loadRouter";
import { magRouter } from "./routers/magRoute";
import { authToken } from "./utils/authToken";
import { config } from "./utils/config";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
//check it
// app.use(
//   cookiesession({
//     name: "_auth",
//     keys: [config.JWT_SECRET, config.keys],
//     httpOnly: true,
//   })
// );

app.use("/", homeRouter);
app.use("/driver", authToken, driverRouter);
app.use("/load", authToken, loadRouter);
app.use("/mag", authToken, magRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:3001`);
});
