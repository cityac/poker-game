import * as actionTypes from '../actions/actionTypes';

import Card from '~/models/card';

const initialState = {
  loading: false,
  players: [],
  id: undefined,
  bet: undefined,
  pot: undefined,
  preselectRaise: undefined,
  flopCards: [],
};

const setCurrentTable = (state, {id, bet, pot, playerPreselectRaise, flopCards}) => {
  return { 
    ...state, 
    id,
    bet,
    pot,
    preselectRaise: playerPreselectRaise,
    flopCards,
  };
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_PLAYERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_PLAYERS_FAIL:
      return { ...state, loading: false };
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return { ...state, players: payload, loading: false };
    case actionTypes.SET_CURRENT_TABLE:
      return setCurrentTable(state, payload);
    case actionTypes.PRESELECT_RAISE:
      return { ...state, preselectRaise: payload.value };
  }
  return state;
};
