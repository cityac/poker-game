import { initTables, fetchPlayersByTable, setCurrentTable} from './';

export const initGame = () => {
  return (dispatch, getState)  => {
    return dispatch(initTables(getState().auth.userId)).then(() => {
      return dispatch(fetchPlayersByTable(getState().player.tables[0].id)).then(() => {
        const table = getState().player.tables[0];
        table.current = true;
        return dispatch(setCurrentTable(table));
      });
    });
  };
};
