import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";
import { FieldPacket } from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];

//activeRecord
export class UserRecord {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public startDate?: Date;

  constructor(obj: UserRecord) {
    if (!obj.name || obj.name.length < 2 || obj.name.length > 50) {
      throw new ValidationError("Load name have to has min 3 to 50 signs");
    }

    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
    this.startDate = obj.startDate;
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.startDate) {
      this.startDate = new Date();
    }

    await pool.execute(
      "INSERT INTO `users_list`(`id`, `name`, `email`, `password`, startDate) VALUES (:id, :name, :email, :password, startDate)",
      this
    );
    return this.name;
  }

  static async listAll(): Promise<UserRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `users_record` ORDER BY `name` ASC"
    )) as UserRecordResults;
    return results.map((obj) => new UserRecord(obj));
  }

  static async getOne(email: string) {
    const [results] = (await pool.execute(
      "SELECT * FROM `users_list` WHERE `email` = :email",
      {
        email,
      }
    )) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  static async getOneById(id: string) {
    const [results] = (await pool.execute(
      "SELECT * FROM `users_list` WHERE `id` = :id",
      {
        id,
      }
    )) as UserRecordResults;
    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async update(): Promise<void> {
    await pool.execute(
      "UPDATE `user_list` SET `name` = :name, `referenceNumber` = :referenceNumber WHERE `id` = :id",
      {
        name: this.name,
        email: this.email,
        password: this.password,
      }
    );
  }

  async delete(): Promise<void> {
    await pool.execute("DELETE FROM `user_list` WHERE `email` = :email", {
      email: this.email,
    });
  }
}
