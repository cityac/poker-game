import { SET_GAME_BACK_PATH, GAME_MODE_OFF, GAME_MODE_ON} from './actionTypes';

import { initTables, fetchPlayersByTable, setCurrentTable} from './';

export const switchGameMode = (on: boolean) => ({
  type: on ? GAME_MODE_ON : GAME_MODE_OFF
})

export const setGameBackPath = path => ({
type: SET_GAME_BACK_PATH,
payload: path
})


export const initGame = () => {
  return (dispatch, getState)  => {
    return dispatch(initTables(getState().auth.userId)).then(() => {
      return dispatch(fetchPlayersByTable(getState().player.tables[0].id)).then(() => {
        const table = getState().player.tables[0];
        table.current = true;
        return dispatch(setCurrentTable(table));
      })
    })
  }
}

