export enum Action {
  loading,
  unloading,
}

export interface DriverEntity {
  id?: string;
  referenceNumber: string;
  name: string;
  lastName: string;
  phoneNumber: number;
  truckNumber: string;
  trailerNumber: string;
  loadingUnloading: Action;
}
