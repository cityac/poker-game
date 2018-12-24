import * as actionTypes from '../actions/actionTypes'

const initialState = {
  message: 'We are going to create awesome game',
  game: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GAME_MODE_ON:
      return { ...state, game: true };
    
    case actionTypes.GAME_MODE_OFF:
      return { ...state, game: false };
  }
  return state;
};
