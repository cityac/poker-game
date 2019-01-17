import * as actionTypes from '../actions/actionTypes'

const initialState = {
  message: 'We are going to create awesome game', // TODO: remove
  game: false, // is application on game screen (/game)
  standalone: false, // application is run from home screen launcher
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_STANDALONE:
      return {...state, standalone: true};

    case actionTypes.GAME_MODE_ON:
      return { ...state, game: true };
    
    case actionTypes.GAME_MODE_OFF:
      return { ...state, game: false };
  }
  return state;
};
