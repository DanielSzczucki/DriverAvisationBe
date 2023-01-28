import { Router } from "express";
import { LoadRecord } from "../record/load.record";
import { DriverRecord } from "../record/driver.record";
import { GetSingleLoadRes } from "../types";
import { ValidationError } from "../utils/errors";

export const loadRouter = Router();

loadRouter
  .get("/", async (req, res) => {
    const loadList = await LoadRecord.listAll();
    const driverList = await DriverRecord.listAll();

    res.json({
      loadRouter: "ok",
      loadList,
      driverList,
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
    const load = await LoadRecord.getOne(req.params.id);

    if (!load) {
      throw new ValidationError("No such load");
    }

    if ((await load.countGivenLoads()) > 0) {
      throw new ValidationError("Cnnot remove given load");
    }

    await load.delete();
    res.end();
  });
