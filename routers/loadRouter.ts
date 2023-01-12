import { Router } from "express";
import { LoadRecord } from "../record/load.record";
import { DriverRecord } from "../record/driver.record";

export const loadRouter = Router();

loadRouter.get("/", async (req, res) => {
  const loadList = await LoadRecord.listAll();
  const driverList = await DriverRecord.listAll();

  res.json({
    loadRouter: "ok",
    loadList,
    driverList,
  });
});
