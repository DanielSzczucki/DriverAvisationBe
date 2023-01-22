import { DriverRecord } from "../record/driver.record";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

afterAll(async () => {
  await pool.end();
});

test("Uninserted LoadRecord should have no id", async () => {
  const driver = new DriverRecord({
    referenceNumber: "RUS-1212-234",
    name: "Dan",
    lastName: "Tona",
    phoneNumber: 48798787765,
    truckNumber: "NO4608Y",
    trailerNumber: "WGM56987",
    loadingUnloading: "unloading",
  });

  expect(driver.id).toBeUndefined();
});

test("Inserted DriverRecord shoud have id and this id id uuid", async () => {
  const driver = new DriverRecord({
    referenceNumber: "RUS-1212-234",
    name: "Dan",
    lastName: "Tona",
    phoneNumber: 48798787765,
    truckNumber: "NO4608Y",
    trailerNumber: "WGM56987",
    loadingUnloading: "unloading",
  });

  await driver.insert();

  expect(driver.id).toBeDefined();
  expect(driver.id).toMatch(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  );

  await driver.delete();
});

test("Throw?", async () => {
  const driver = new DriverRecord({
    referenceNumber: "RUS-1212-234",
    name: "D",
    lastName: "Tona",
    phoneNumber: 48798787765,
    truckNumber: "NO4608Y",
    trailerNumber: "WGM56987",
    loadingUnloading: "unloading",
  });

  await driver.insert();

  expect(driver.name.length <= 3).toThrow();

  await driver.delete();
});
