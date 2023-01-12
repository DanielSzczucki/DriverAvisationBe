import * as express from "express";
import "express-async-errors";
import * as cors from "cors";
import { homeRouter } from "./routers/homeRouter";
import { driverRouter } from "./routers/driverRouter";
import { loadRouter } from "./routers/loadRouter";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/", homeRouter);
app.use("/driver", driverRouter);
app.use("/load", loadRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:3001`);
});
