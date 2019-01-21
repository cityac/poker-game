import { initTables, selectTable} from './';

export const initGame = () => {
  return (dispatch, getState)  => {
    return dispatch(initTables(getState().auth.userId)).then(() => {
      return dispatch(selectTable(getState().player.tables[0].id));
    });
  };
};
