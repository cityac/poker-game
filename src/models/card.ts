export enum PlayerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD',
  DEALER = 'DEALER',
}

export default interface Card {
  name: string;
  coord?: {x: number, y: number};
  status?: string;
}