import { initTables, selectTable} from './';
import { CHAT_MODE_ON, CHAT_MODE_OFF } from '../actions/actionTypes' 
import { initDashboard } from  './';

export const initGame = () => {
  return (dispatch, getState)  => {
    return dispatch(initTables(getState().auth.userId)).then(() => {
      return dispatch(initDashboard(getState().player.tables.map(el => el.id))).then(() => {
        return dispatch(selectTable(getState().player.tables[0].id));
      })
    });
  };
};

export const switchChatMode = (on: boolean) => ({
  type: on ? CHAT_MODE_ON : CHAT_MODE_OFF,
});
