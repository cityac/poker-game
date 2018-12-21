import * as actionTypes from './actionTypes';

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const login = (path) => {
  return {
    type: actionTypes.LOGIN,
    path,
  };
};
