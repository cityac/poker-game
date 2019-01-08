import Player from "./player";
import User from './user';
import Card from './card';

export enum TableStatus {
  AWAY = 'AWAY',
  PLAYING = 'PLAYING',
}

export default interface Table {
  id: string,
  players: Array<Player>,
  user: User,
  bet: number,
  // status: TableStatus, should be replaced with user.status
  // playerCards: Array<Card>, should be replaced with user.cards
  current: boolean,
}
