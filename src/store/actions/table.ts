import axios from '~/http/axios';
import {
  FETCH_PLAYERS_START,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAIL,

  SET_CURRENT_TABLE,
} from './actionTypes';

export const  selectTable = tableId => {
  const id = tableId;

  // TODO
  // Step 1 fetch users for table
  // Step 2 set current table

};

export const setCurrentTable = table => ({
  type: SET_CURRENT_TABLE,
  payload: table,
});

const fetchPlayersStart = () => ({
  type: FETCH_PLAYERS_START,
});

const fetchPlayersSuccess = players => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
});

const fetchPlayersFail = error => ({
  type: FETCH_PLAYERS_FAIL,
  payload: error,
});

export const fetchPlayersByTable = tableId => {
  return dispatch => {
    dispatch(fetchPlayersStart());
    return axios.get(`players?tableId=${tableId}&_expand=user`)
      .then(res => {
        return dispatch(fetchPlayersSuccess(res.data));

      })
      .catch(error => {
        return dispatch(fetchPlayersFail(error));
      });
  };
};
