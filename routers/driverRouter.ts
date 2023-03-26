import { Router } from "express";
import { DriverRecord } from "../record/driver.record";
import { LoadRecord } from "../record/load.record";

import { ValidationError } from "../utils/errors";
import { CreateDriverReq, SetLoadForDriverReq } from "../types";
import { authToken } from "../utils/authToken";

export const driverRouter = Router();

driverRouter

  .get("/", authToken, async (req, res) => {
    const driverList = await DriverRecord.listAll();
    const loadList = await LoadRecord.listAll();

    res.json({
      driverRouter: "ok",
      driverList,
      loadList,
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

      res.json({
        driverRouter: "ok, driver assigned to load",
        assignedDriver,
      });
    } catch (e) {
      res.status(406).json({ message: "Wrong reference number" });
    }
  })

  .patch("/driver/:driverId", async (req, res) => {
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

    // driver.referenceNumber = load?.referenceNumber ?? null;
    await driver.update();
    res.json(driver);

    // @TODO add loadId to driver.record.ts
    // add driver update
    //send json with driver
  });
