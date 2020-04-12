import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: 1,
  authRedirectPath: '/',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.LOGIN:
      return { ...state, token: 'AUTH_TOKEN', authRedirectPath: payload};
    case actionTypes.LOGOUT:
      return { ...state, token: null, authRedirectPath: '/auth' };
    default:
      return state;
  }
};
