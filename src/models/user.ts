import Player from './player';

export default interface User extends Player {
  raiseValue: number,
  lastAction: string,
};