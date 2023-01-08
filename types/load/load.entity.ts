export enum Units {
  pallets,
  ldm,
  pcs,
  other,
}
export interface LoadEntity {
  id?: string;
  referenceNumber: string;
  loadName: string;
  sender: string;
  recipient: string;
  units: Units;
  quantity: number;
  weight: number;
}
