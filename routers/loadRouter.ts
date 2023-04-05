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
    console.log(load);
    const drivers = await DriverRecord.listAll();

    //check is load exist with new reference number?
    const driverFoundWithNewRef = drivers.find(
      (driver) => driver.referenceNumber === body.referenceNumber
    );

    if (!driverFoundWithNewRef) {
      res.status(404).json({
        message: `Driver with ref ${body.referenceNumber} and this id ${body.id} not found`,
      });
      throw new ValidationError(`Driver with id ${body.driverId} not found`);
    }

    if (!load) {
      res.status(404).json({
        message: `Load with id ${req.params.id} not found`,
      });
      throw new ValidationError(
        `Can't find load with this id:${req.params.id} `
      );
    }
    //changed driverId for new driver Id matched with load ref
    body.driverId = driverFoundWithNewRef.id;

    Object.assign(load, body);

    await load.update();
    res.json({
      message: `Load ${load.id} data updated`,
      load,
    });
  });
