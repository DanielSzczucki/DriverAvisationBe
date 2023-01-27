import { Router } from "express";
import { LoadRecord } from "../record/load.record";
import { DriverRecord } from "../record/driver.record";
import { GetSingleLoadRes } from "../types";

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
    const loadCount = await load.countGivenLoads();

    res.json({
      load,
      loadCount,
    } as GetSingleLoadRes);
  });
