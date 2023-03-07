import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { v4 as uuid } from "uuid";
import { FieldPacket } from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];

//activeRecord
export class UserRecord {
  public name: string;
  public email: string;
  public password: string;

  constructor(obj: UserRecord) {
    if (!obj.name || obj.name.length < 2 || obj.name.length > 50) {
      throw new ValidationError("Load name have to has min 3 to 50 signs");
    }

    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
  }

  async insert(): Promise<string> {
    await pool.execute(
      "INSERT INTO `users_list`(`name`, `email`, `password`) VALUES (:name, :email, :password)",
      this
    );
    return this.name;
  }

  static async listAll(): Promise<UserRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `user_record` ORDER BY `name` ASC"
    )) as UserRecordResults;
    return results.map((obj) => new UserRecord(obj));
  }

  static async getOne(email: string) {
    const [results] = (await pool.execute(
      "SELECT * FROM `user_list` WHERE `email` = :email",
      {
        email,
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
