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

export const switchGameMode = (on: boolean) => {
  return {
    type: on ? actionTypes.GAME_MODE_ON : actionTypes.GAME_MODE_OFF
  }
} 
