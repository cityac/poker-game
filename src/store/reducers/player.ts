import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: undefined,
  loading: false,
  tables: [],
  preselectRaise: undefined,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_TABLES_START:
      return { ...state, loading: false };
    case actionTypes.FETCH_TABLES_SUCCESS:
      return { ...state, tables: payload, loading: false };
    case actionTypes.FETCH_TABLES_FAIL:
      return { ...state, error: payload, loading: false };
    case actionTypes.PRESELECT_RAISE:
      return {...state, preselectRaise: payload};
  }
  return state;
};
