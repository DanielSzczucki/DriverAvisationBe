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

    // console.log(loadList);

    res.json({
      driverRouter: "ok",
      driverList,
      loadList,
    });
  })

  .get("/:id", async (req, res) => {
    const driver = await DriverRecord.getOne(req.params.id);
    // const load = await LoadRecord.getOne(req.params.loadId);

    res.json({
      singleDriver: "ok",
      driver,
    });
  })

  .post("/", async (req, res) => {
    const newDriver = new DriverRecord(req.body as CreateDriverReq);

    await newDriver.insert();
    res.json(newDriver);
  })

  .patch("/load/:driverId", async (req, res) => {
    const { body }: { body: SetLoadForDriverReq } = req;

    console.log(body);

    const driver = await DriverRecord.getOne(req.params.driverId);

    if (driver === null) {
      throw new ValidationError(`Can't find driver with this id:${driver.id} `);
    }

    const load =
      body.loadId === "" ? null : await LoadRecord.getOne(body.loadId);

    if (load) {
      if (load.quantity <= (await load.countGivenLoads())) {
        throw new ValidationError("There is not enough of this product");
      }
    }

    driver.referenceNumber = load.referenceNumber ?? null;
    await driver.update();
    res.json(driver);

    // @TODO add loadId to driver.record.ts
    //add verification driver load id = load it ?? null
    // add driver update
    //send json with driver
    /////////////////usuń dane z tabeli i dodaj klucze
  });
