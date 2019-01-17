import Card from './card';
import User from './user';

export enum PlayerStatus {
  ACTIVE = 'ACTIVE',
  AWAY = 'AWAY',
  FOLD = 'FOLD',
  DEALER = 'DEALER',
}
export default interface Player {
  user: User;
  place: number;
  status: PlayerStatus;
  balance: number;
  progress?: number;
  currentUser?: boolean;
  bet?: string;
  dealer?: boolean;
  cards?: Card[];
  preselectRaise?: number;
}
