import { Router } from "express";
import { DriverRecord } from "../record/driver.record";
import { LoadRecord } from "../record/load.record";

import { ValidationError } from "../utils/errors";
import { CreateDriverReq, DriverEntity, SetLoadForDriverReq } from "../types";
import { authToken } from "../utils/authToken";

export const driverRouter = Router();

driverRouter

  .get("/", authToken, async (req, res) => {
    const driverList = await DriverRecord.listAll();

    res.json({
      driverRouter: "ok",
      driverList,
    });
  })

  .get("/:id", authToken, async (req, res) => {
    const driver = await DriverRecord.getOne(req.params.id);

    res.json({
      singleDriver: "ok",
      driver,
    });
  })

  .post("/", async (req, res) => {
    try {
      const newDriver = new DriverRecord(req.body as CreateDriverReq);
      const assignedDriver = await newDriver.assignDriverToLoad();
      await assignedDriver.insert();
      await LoadRecord.assignLoadToDriver(assignedDriver.loadId);

      res.json({
        driverRouter: "Ok, driver assigned to load",
        assignedDriver,
      });
    } catch (e) {
      res.status(406).json({ message: "Wrong reference number" });
    }
  })

  .put("/:id", async (req, res) => {
    const { body }: { body: DriverEntity } = req;
    const driver = await DriverRecord.getOne(req.params.id);
    console.log(driver);
    const loads = await LoadRecord.listAll();

    //check is load exist with new reference number?
    const loadFoundWithNewRef = loads.find(
      (load) => load.referenceNumber === body.referenceNumber
    );

    if (!loadFoundWithNewRef) {
      res.status(404).json({
        message: `Load with ref ${body.referenceNumber} and this id ${body.loadId} not found`,
      });
      throw new ValidationError(`Load with id ${body.loadId} not found`);
    }

    if (!driver) {
      res.status(404).json({
        message: `Driver with id ${req.params.id} not found`,
      });
      throw new ValidationError(
        `Can't find driver with this id:${req.params.id} `
      );
    }
    //changed loadId for new load Id matched with load ref
    body.loadId = loadFoundWithNewRef.id;

    Object.assign(driver, body);

    await driver.update();
    res.json({
      message: `Driver ${driver.id} data updated`,
      driver,
    });
  })

  .delete("/:id", async (req, res) => {
    const driver = await DriverRecord.getOne(req.params.id);

    //a driver can only be added when load ref no matches

    if (!driver) {
      res
        .status(404)
        .json({ message: `Driver with id ${req.params.id} not found` });
      throw new ValidationError("No such driver");
    }

    await driver.delete();
    res.status(202).json({
      message: `Driver ${req.params.id} was succesfully deleted`,
    });
  });

// @TODO add loadId to driver.record.ts
// add driver update
//send json with driver
