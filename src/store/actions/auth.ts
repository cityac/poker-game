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