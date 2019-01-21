import * as actionTypes from '../actions/actionTypes';

import Table from '~/models/table';

const initialState = {
  loading: false,
  players: [],
  id: undefined,
  bet: undefined,
  pot: undefined,
  preselectRaise: undefined,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_PLAYERS_START:
      return { ...state, loading: true };
    case actionTypes.FETCH_PLAYERS_FAIL:
      return { ...state, loading: false };
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return { ...state, players: payload, loading: false };
    case actionTypes.SET_CURRENT_TABLE:
      return { ...state, id: payload.id,  bet: payload.bet, pot: payload.pot, preselectRaise: payload.playerPreselectRaise};
    case actionTypes.PRESELECT_RAISE:
      return { ...state, preselectRaise: payload.value };
  }
  return state;
};
