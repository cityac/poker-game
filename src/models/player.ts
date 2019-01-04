export enum PlayerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD',  
  DEALER = 'DEALER',
}
export default interface Player {
  place: number,
  name: string,
  avatar?: string,
  balance: number,
  progress?: number;
  currentUser?: boolean,
  bet?: string,
  status: PlayerStatus,
  dealer?: boolean,
}