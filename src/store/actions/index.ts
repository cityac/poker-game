import * as actionTypes from './actionTypes';

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const login = (path: string) => {
  return {
    type: actionTypes.LOGIN,
    path,
  };
};

export const switchGameMode = (on: boolean) => ({
    type: on ? actionTypes.GAME_MODE_ON : actionTypes.GAME_MODE_OFF
})

export const setGameBackPath = path => ({
  type: actionTypes.SET_GAME_BACK_PATH,
  payload: path
})

export const preselectRaise = (value: number) => ({
  type: actionTypes.PRESELECT_RAISE,
  payload: value,
})
