import { SET_GAME_BACK_PATH, GAME_MODE_OFF, GAME_MODE_ON, SET_STANDALONE} from './actionTypes';

export const switchGameMode = (on: boolean) => ({
  type: on ? GAME_MODE_ON : GAME_MODE_OFF,
});

export const setGameBackPath = path => ({
type: SET_GAME_BACK_PATH,
payload: path,
});

export const setStandalone = () => ({
  type: SET_STANDALONE
});