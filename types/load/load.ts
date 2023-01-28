import { LoadEntity } from "./load.entity";

export type CreateLoadReq = Omit<LoadEntity, "id">;

export interface GetSingleLoadRes {
  load: LoadEntity;
  givenCount: number;
}
