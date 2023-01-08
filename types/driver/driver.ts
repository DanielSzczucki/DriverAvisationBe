import { LoadEntity } from "../load";
import { DriverEntity } from "./driver.entity";

export interface ListDriverRes {
  driverList: DriverEntity[];
  loadList: LoadEntity[];
}

export type CreateDriverReq = Omit<DriverEntity, "id">;

export interface SetLoadForDriverReq {
  loadId: string;
}
