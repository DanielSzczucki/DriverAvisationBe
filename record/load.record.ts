import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";
import { LoadEntity, Units } from "../types";
import { FieldPacket } from "mysql2";

type LoadRecordResults = [LoadRecord[], FieldPacket[]];

export class LoadRecord implements LoadEntity {
  public id?: string;
  public referenceNumber: string;
  public loadName: string;
  public sender: string;
  public recipient: string;
  public units: Units;
  public quantity: number;
  public weight: number;
  public driverId: string;

  constructor(obj: LoadEntity) {
    if (obj.referenceNumber.length !== 12) {
      throw new ValidationError(
        "Load have to has reference number and his lenght is 12 signs"
      );
    }

    if (!obj.loadName || obj.loadName.length < 3 || obj.loadName.length > 50) {
      throw new ValidationError("Load name have to has min 3 to 50 signs");
    }

    if (Number(!obj.quantity) || Number(!obj.weight)) {
      throw new ValidationError(
        "Load have to has its properties: quantity and weight > 1"
      );
    }

    this.id = obj.id;
    this.referenceNumber = obj.referenceNumber;
    this.loadName = obj.loadName;
    this.sender = obj.sender;
    this.recipient = obj.recipient;
    this.units = obj.units;
    this.quantity = obj.quantity;
    this.weight = obj.weight;
    this.driverId = obj.driverId;
    //ref 12 znaków
    //name min 3 znaki
    //units musi byc
    // quantity min 1
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute(
      "INSERT INTO `loads_list` Values(:id, :referenceNumber, :loadName)",
      {
        id: this.id,
        referenceNumber: this.referenceNumber,
        loadName: this.loadName,
      }
    );
    return this.id;
  }

  static async listAll(): Promise<LoadRecord[] | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `loads_list`"
    )) as LoadRecordResults;
    return results.map((obj) => new LoadRecord(obj));
  }

  static async getOne(id: string): Promise<LoadRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `loads_list` WHERE `id` = :id",
      {
        id,
      }
    )) as LoadRecordResults;
    return results.length === 0 ? null : new LoadRecord(results[0]);
  }

  async countGivenLoads(): Promise<number> {
    const [[{ quantity }]] = (await pool.execute(
      "SELECT QUANTITY(*) AS `quantity` FROM `loads_list` WHERE `id` = :id",
      {
        id: this.id,
      }
    )) as LoadRecordResults;
    return quantity;
  }

  async delete(): Promise<void> {
    await pool.execute("DELETE FROM `loads_list` WHERE `id` = :id", {
      id: this.id,
    });
  }
}

//TODO wyczuysc wywyłanie wszystkiego na front, wyślij to co potrzebne
