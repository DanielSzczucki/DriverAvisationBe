import express from "express";
import "express-async-errors";
import cors from "cors";
import { homeRouter } from "./routers/homeRouter";
import { driverRouter } from "./routers/driverRouter";
import { loadRouter } from "./routers/loadRouter";
import { magRouter } from "./routers/magRoute";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/", homeRouter);
app.use("/driver", driverRouter);
app.use("/load", loadRouter);
app.use("/mag", magRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:3001`);
});
