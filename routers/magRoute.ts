import { Router } from "express";
import { LoadRecord } from "../record/load.record";
import { DriverRecord } from "../record/driver.record";
import { isContext } from "vm";

export const magRouter = Router();

magRouter.get("/", async (req, res) => {
  const loadList = await LoadRecord.listAll();
  const driverList = await DriverRecord.listAll();

  res.json({
    magRouter: "ok",
  });
});

//rout do zarżadzania wszystkim
