import { DriverRecord } from "../record/driver.record";
import { DriverEntity, Units } from "../types";

import { LoadRecord } from "../record/load.record";
import { LoadEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

afterAll(async () => {
  await pool.end();
});

describe("method assignDriverToLoads", () => {
  let newDriver: DriverRecord;
  let newLoad: LoadRecord;

  beforeEach(async () => {
    const driver: DriverEntity = {
      id: "512d3c6b-83ca-408e-bdaf-a34b367bf2dd",
      referenceNumber: "222222222222",
      name: "eeeeeeeeeeeeeee",
      lastName: "eeeeeeeeeeee",
      phoneNumber: 999999999,
      truckNumber: "eeeeee",
      trailerNumber: "eeeeee",
      companyName: "iiiiiii",
      loadingUnloading: "loading",
      loadId: "",
    };
    const load: LoadEntity = {
      id: "8b7755bf-91f7-427c-a569-979d3339cace",
      referenceNumber: "222222222222",
      loadName: "22222",
      sender: "22222",
      forwarder: "22222",
      recipient: "22222",
      units: Units.pallets,
      quantity: 22,
      weight: 22222,
      driverId: null,
      count: undefined,
      startDate: "21.03.2023",
      endDate: "NOT SIGN",
    };

    newLoad = new LoadRecord(load);
    newDriver = new DriverRecord(driver);
  });

  it("should assign driver to load when load with matching reference number is found", async () => {
    const result = await newDriver.assignDriverToLoad();
    expect(result.referenceNumber).toBe(newLoad.referenceNumber);
  });

  it("should throw a ValidationError when load with matching reference number is not found", async () => {
    newDriver.referenceNumber = "wrong_reference_number";

    await expect(newDriver.assignDriverToLoad()).rejects.toThrowError(
      new ValidationError("Wrong reference number")
    );
  });
});
