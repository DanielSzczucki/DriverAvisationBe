import * as express from "express";
import "express-async-errors";
import * as cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// app.use("/", homeRouter);

app.listen(3001, "0.0.0.0");
