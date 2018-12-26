import { String } from "postcss-selector-parser";
export enum GamerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD'
}
export default interface User {
  name: string,
  avatar: string,
  balance: number,
  bet?: string,
  status: GamerStatus,
}