import axios from '~/http/axios';

import {
  PRESELECT_RAISE,
  FETCH_TABLES_START,
  FETCH_TABLES_SUCCESS,
  FETCH_TABLES_FAIL,
} from './actionTypes';

export const preselectRaise = (value: number, tableId: string ) => ({
  type: PRESELECT_RAISE,
  payload: {value, tableId}
  });

const initTablesStart = () => ({
  type: FETCH_TABLES_START,
});

const initTablesSuccess = tables => ({
  type: FETCH_TABLES_SUCCESS,
  payload: tables,
});

const initTablesFail = error => ({
  type: FETCH_TABLES_FAIL,
  payload: error,
});

export const initTables = (playerId) => {
  return dispatch => {
    dispatch(initTablesStart());
    return axios.get('/tables')
      .then(res => {
        return dispatch(initTablesSuccess(res.data));
    } )
    .catch(error => {
      return dispatch(initTablesFail(error));
    });
  };
};
