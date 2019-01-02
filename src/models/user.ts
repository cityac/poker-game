import { String } from "postcss-selector-parser";
export enum GamerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD',  
  DEALER = 'DEALER',
}
export default interface User {
  name: string,
  avatar?: string,
  balance: number,
  currentUser?: boolean,
  bet?: string,
  status: GamerStatus,
  dealer?: boolean,
}