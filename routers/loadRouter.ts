import { Router } from "express";
import { LoadRecord } from "../record/load.record";
import { DriverRecord } from "../record/driver.record";
import { CreateLoadReq, GetSingleLoadRes, LoadEntity } from "../types";
import { ValidationError } from "../utils/errors";

export const loadRouter = Router();

loadRouter
  .get("/", async (req, res) => {
    const loadList = await LoadRecord.listAll();

    console.log(loadList);

    res.json({
      loadRouter: "ok",
      loadList,
    });
  })

  .get("/:loadId", async (req, res) => {
    const load = await LoadRecord.getOne(req.params.loadId);
    const givenCount = await load.countGivenLoads();

    console.log(givenCount);
    console.log(load);

    res.json({
      load,
      givenCount,
    } as GetSingleLoadRes);
  })

  .delete("/:id", async (req, res) => {
    console.log(req.params.id);

    const load = await LoadRecord.getOne(req.params.id);

    if (!load) {
      throw new ValidationError("No such load");
    }

    if (!load) {
      res.status(404).json({
        message: "No such load",
      });
      throw new ValidationError("No such load");
    }

    await load.delete();
    res.status(202).json({
      message: `Load ${req.params.id} was succesfully deleted`,
    });
  })

  .post("/", async (req, res) => {
    const newLoad = new LoadRecord(req.body as CreateLoadReq);
    await newLoad.insert();

    res.json(newLoad);
  })

  .put("/:id", async (req, res) => {
    const { body }: { body: LoadEntity } = req;
    const load = await LoadRecord.getOne(req.params.id);

    //is load exist?
    if (!load) {
      res.status(404).json({
        message: `Load with id ${req.params.id} not found`,
      });
      throw new ValidationError(
        `Can't find load with this id:${req.params.id} `
      );
    }

    //delete load from first driver
    if (load.driverId) {
      const firstDriver = await DriverRecord.getOne(load.driverId);
      firstDriver.loadId = null;
      console.log("Driver with load assign", firstDriver);
      await firstDriver.update();
    }

    //update second (new assign) driver with new load
    if (body.driverId) {
      const secondDriver = await DriverRecord.getOne(body.driverId);
      secondDriver.loadId = body.id;
      console.log("Driver with load assign", secondDriver);

      await secondDriver.update();
    }

    //changed driverId for new driver Id matched with load ref
    // body.driverId = driverFoundWithNewRef.id;

    Object.assign(load, body);
    await load.update();

    res.json({
      message: `Load ${load.loadName} with ID: ${load.id} data updated`,
      load,
    });
  });
