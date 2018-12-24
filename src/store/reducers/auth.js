import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  authRedirectPath: '/',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, token: 'AUTH_TOKEN', authRedirectPath: action.path };
    case actionTypes.LOGOUT:
      return { ...state, token: null, authRedirectPath: '/auth' };
    default:
      return state;
  }
};
