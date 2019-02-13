import { SET_GAME_BACK_PATH, CHAT_MODE_ON, CHAT_MODE_OFF} from '../actions/actionTypes';
import Player from '~/models/player';

interface State {
  backPath: string;
  chat: boolean;
}

const initialState: State = {
  backPath: null,
  chat: false, 
};

export default (state = initialState, action): State => {
  switch (action.type) {
    case SET_GAME_BACK_PATH:
      return { ...state, backPath: action.payload };
    case CHAT_MODE_ON:
      return { ...state, chat: true }
    case CHAT_MODE_OFF:
      return { ...state, chat: false }
    default:
        return state;
  }
};
