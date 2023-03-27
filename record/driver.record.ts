import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { DriverEntity } from "../types";
import { v4 as uuid } from "uuid";
import { FieldPacket } from "mysql2";
import { LoadRecord } from "./load.record";

type DriverRecordResults = [DriverEntity[], FieldPacket[]];

//activeRecord
export class DriverRecord implements DriverEntity {
  public id?: string;
  public referenceNumber: string;
  public name: string;
  public lastName: string;
  public phoneNumber: number;
  public truckNumber: string;
  public trailerNumber: string;
  public companyName: string;
  public loadingUnloading: string;
  public loadId: string;

  constructor(obj: DriverEntity) {
    if (obj.referenceNumber.length < 12) {
      throw new ValidationError(
        "Load have to has reference number and his lenght is 12 signs"
      );
    }

    if (!obj.name || obj.name.length < 2 || obj.name.length > 50) {
      throw new ValidationError("Load name have to has min 3 to 50 signs");
    }

    this.id = obj.id;
    this.referenceNumber = obj.referenceNumber;
    this.name = obj.name;
    this.lastName = obj.lastName;
    this.phoneNumber = obj.phoneNumber;
    this.truckNumber = obj.truckNumber;
    this.trailerNumber = obj.trailerNumber;
    this.companyName = obj.companyName;
    this.loadingUnloading = obj.loadingUnloading;
    this.loadId = obj.loadId;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute(
      "INSERT INTO `drivers_list`(`id`, `referenceNumber`, `name`, `lastName`, `phoneNumber`, `truckNumber`, `trailerNumber`, `companyName`, `loadingUnloading`, `loadId`) VALUES (:id, :referenceNumber, :name, :lastName, :phoneNumber, :truckNumber, :trailerNumber, :companyName, :loadingUnloading, :loadId)",
      this
    );
    return this.id;
  }

  static async listAll(): Promise<DriverRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `drivers_list` ORDER BY `name` ASC"
    )) as DriverRecordResults;
    return results.map((obj) => new DriverRecord(obj));
  }

  static async getOne(id: string) {
    const [results] = (await pool.execute(
      "SELECT * FROM `drivers_list` WHERE `id` = :id",
      {
        id,
      }
    )) as DriverRecordResults;
    return results.length === 0 ? null : new DriverRecord(results[0]);
  }

  async update(): Promise<void> {
    await pool.execute(
      "UPDATE `drivers_list` SET `loadId` = :loadId WHERE `id`= :id",
      {
        loadId: this.loadId,
        id: this.id,
      }
    );
  }

  async assignDriverToLoad(this: DriverRecord): Promise<DriverRecord> {
    const loadsList = await LoadRecord.listAll();

    const foundLoad = loadsList.find(
      (load) => load.referenceNumber === this.referenceNumber
    );
    console.log("Driver object", this);

    // await foundLoad.update();

    if (!foundLoad) {
      throw new ValidationError("Wrong reference number");
    } else {
      this.loadId = foundLoad.id;
      //overloaded solution
      // await foundLoad.assignLoadToDriver();
      return this;
    }
  }

  async delete(): Promise<void> {
    await pool.execute("DELETE FROM `drivers_list` WHERE `id` = :id", {
      id: this.id,
    });
  }
}

//@TODO dodaj: - datę rekordu.
