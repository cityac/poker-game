import Player from "./player";
import Card from './card';

export enum TableStatus {
  AWAY = 'AWAY',
  PLAYING = 'PLAYING',
}

export default interface Table {
  id: string,
  players: Array<Player>
  status: TableStatus,
  playerCards: Array<Card>,
  current: boolean,
}
