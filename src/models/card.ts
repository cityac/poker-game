export enum PlayerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD',
  DEALER = 'DEALER',
}

export interface Coord {
  x: number;
  y: number;
}

export default interface Card {
  name: string;
  coord?: Coord;
  status?: string;
}
  