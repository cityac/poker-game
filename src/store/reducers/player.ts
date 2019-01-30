import * as actionTypes from '../actions/actionTypes';
import table from './table';

const initialState = {
  error: undefined,
  loading: false,
  tables: [],
};

const preselectRaise = (state, raise, tableId) => {
  const tables = state.tables.map(table => {
    if(table.id === tableId) {
      return { ...table, playerPreselectRaise: raise}
    }
    return table;
  });

  return {...state, tables};
}

const getPlayers = (tableId, payload) => {
  const tablesIds = payload[0];
  const index = tablesIds.indexOf(tableId);
  return payload[index + 1].data; //index of Promise.all response
}

const initDashboardSuccess = (state, payload) => {

  const tables = state.tables.map(table => ({ 
      ...table, 
      players: getPlayers(table.id, payload),
    })
  );

  return {...state, tables};
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_TABLES_START:
      return { ...state, loading: false };
    case actionTypes.FETCH_TABLES_SUCCESS:
      return { ...state, tables: payload, loading: false };
    case actionTypes.FETCH_TABLES_FAIL:
      return { ...state, error: payload, loading: false };
    case actionTypes.INIT_DASHBOARD_SUCCESS:
      return initDashboardSuccess(state, payload);
    case actionTypes.PRESELECT_RAISE:
      return preselectRaise(state, payload.value, payload.tableId);
      
  }
  return state;
};
