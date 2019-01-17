import { SET_GAME_BACK_PATH } from '../actions/actionTypes';
import Player from '~/models/player';

interface State {
  backPath: string;
}

const findUser = (player: Player): boolean => player.currentUser;

const initialState: State = {
  backPath: null,
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_GAME_BACK_PATH:
      return { ...state, backPath: action.payload };
    default:
        return state;
  }
};
