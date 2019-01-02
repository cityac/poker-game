import { SET_GAME_BACK_PATH } from '../actions/actionTypes'
const initialState = {
  message: 'This is the game',
  backPath: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
     case SET_GAME_BACK_PATH:
      return { ...state, backPath: action.payload };
      default:
        return state;
  }
};
