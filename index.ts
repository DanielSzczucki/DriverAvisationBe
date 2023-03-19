import express, { Router } from "express";
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
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const router = Router();

router.use("/", homeRouter);
router.use("/driver", driverRouter);
router.use("/load", authToken, loadRouter);
router.use("/mag", authToken, magRouter);

app.use("/api", router);

app.listen(3001, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:3001`);
});
