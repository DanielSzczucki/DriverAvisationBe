import { Router } from "express";
import { DriverRecord } from "../record/driver.record";
import { LoadRecord } from "../record/load.record";
import { ValidationError } from "../utils/errors";
import { CreateDriverReq, ListDriverRes, SetLoadForDriverReq } from "../types";
import { DriverEntity } from "../types";

export const driverRouter = Router();

driverRouter

  .get("/", async (req, res) => {
    const driverList = await DriverRecord.listAll();
    const loadList = await LoadRecord.listAll();

    console.log(loadList);

    res.json({
      driverRouter: "ready",
      driverList,
      loadList,
    });
  })

  .post("/", async (req, res) => {
    const newDriver = new DriverRecord(req.body as CreateDriverReq);

    await newDriver.insert();
  })

  .patch("/load/:driverId", async (req, res) => {});
