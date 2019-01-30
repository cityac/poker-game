import axios from '~/http/axios';

import {
  PRESELECT_RAISE,
  FETCH_TABLES_START,
  FETCH_TABLES_SUCCESS,
  FETCH_TABLES_FAIL,
  INIT_DASHBOARD_START,
  INIT_DASHBOARD_SUCCESS,
  INIT_DASHBOARD_FAIL,
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

const initDashboardStart = () => ({
  type: INIT_DASHBOARD_START,
});

const initDashboardFail = () => ({
  type: INIT_DASHBOARD_FAIL,
});

const initDashboardSuccess = (payload) => ({
  type: INIT_DASHBOARD_SUCCESS,
  payload,
});

export const initDashboard = (tablesIds) => {
  return dispatch => {
    dispatch(initDashboardStart());
    let promises = [tablesIds];
    tablesIds.forEach(id => {
      promises.push(axios.get(`players?tableId=${id}&_expand=user`))
    });
    return Promise.all(promises).then(payload => {
      dispatch(initDashboardSuccess(payload));
    })
    .catch(error => {
      dispatch(initDashboardFail());
    }) ;
  }
}
