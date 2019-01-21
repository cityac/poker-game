import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: undefined,
  loading: false,
  tables: [],
};

const preselectRaise = (state, raise, tableId) => {
console.log('works', raise, tableId);
  return {...state, preselectRaise: raise};
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_TABLES_START:
      return { ...state, loading: false };
    case actionTypes.FETCH_TABLES_SUCCESS:
      return { ...state, tables: payload, loading: false };
    case actionTypes.FETCH_TABLES_FAIL:
      return { ...state, error: payload, loading: false };
    case actionTypes.PRESELECT_RAISE:
      preselectRaise(state, payload.value, payload.tableId);
      
  }
  return state;
};
