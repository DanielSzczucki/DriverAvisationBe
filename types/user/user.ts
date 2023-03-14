import { UserRecord } from "../../record/user.record";

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  id: string;
}

export type CreateUserReq = Omit<UserRecord, "id">;

export interface UserLoginReq {
  id: string;
  name: string;
  password: string;
  message: string;
}
