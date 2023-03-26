import { DriverRecord } from "../record/driver.record";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

afterAll(async () => {
  await pool.end();
});

describe("DriverRecord", () => {
  const mockDriverRecord = {
    id: "35w926sy-91f7-427c-rt65-979d3339dodo",
    referenceNumber: "RUS-1212-234",
    name: "John",
    lastName: "Doe",
    phoneNumber: 123456789,
    truckNumber: "ABC123",
    trailerNumber: "DEF456",
    companyName: "ABC Company",
    loadingUnloading: "Loading",
    loadId: "8b7755bf-91f7-427c-a569-979d3339cace",
  };

  it("should create a new DriverRecord object", () => {
    const driver = new DriverRecord(mockDriverRecord);
    expect(driver).toBeInstanceOf(DriverRecord);
    expect(driver.referenceNumber).toBe(mockDriverRecord.referenceNumber);
    expect(driver.name).toBe(mockDriverRecord.name);
    expect(driver.lastName).toBe(mockDriverRecord.lastName);
    expect(driver.phoneNumber).toBe(mockDriverRecord.phoneNumber);
    expect(driver.truckNumber).toBe(mockDriverRecord.truckNumber);
    expect(driver.trailerNumber).toBe(mockDriverRecord.trailerNumber);
    expect(driver.companyName).toBe(mockDriverRecord.companyName);
    expect(driver.loadingUnloading).toBe(mockDriverRecord.loadingUnloading);
    expect(driver.loadId).toBe(mockDriverRecord.loadId);
  });

  describe("constructor", () => {
    it("new DriverRecord Shoud have an id and this id = uuid", async () => {
      const driver = new DriverRecord({ ...mockDriverRecord, id: null });
      await driver.insert();

      expect(driver.id).toBeDefined();
      expect(driver.id).toMatch(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      );

      await driver.delete();
    });
    it("should create a new DriverRecord object with all properties", () => {
      const driver = new DriverRecord(mockDriverRecord);
      expect(driver).toEqual(mockDriverRecord);
    });

    it("should throw a ValidationError if referenceNumber length < 12", () => {
      expect(() => {
        new DriverRecord({
          ...mockDriverRecord,
          referenceNumber: "LOAD-123",
        });
      }).toThrow(ValidationError);
    });
  });

  it("should throw a ValidationError if name length < 3", () => {
    expect(() => {
      new DriverRecord({
        ...mockDriverRecord,
        name: "J",
      });
    }).toThrow(ValidationError);
  });

  it("should throw a ValidationError if name length > 50", () => {
    expect(() => {
      new DriverRecord({
        ...mockDriverRecord,
        name: "J".repeat(51),
      });
    }).toThrow(ValidationError);
  });
});
