import { 
  SELECT_SPIN,
  SELECT_NEXT_SPIN,
  SELECT_SPIN_GAMES_NUMBER,
  LOBBY_SWITCH_VIEW,
  LOBBY_CHANGE_GAME_FILTER,
  LOBBY_CHANGE_BUYIN_FILTER,
  LOBBY_APPLY_FILTER,
  LOBBY_RESET_FILTER} from './actionTypes';
export const selectSpin = id => ({
  type: SELECT_SPIN,
  payload: id,
})

export const selectNextSpin = next => ({
  type: SELECT_NEXT_SPIN,
  payload: next,
})

export const selectSpinGamesNumber = (spinId, gamesNumber) => ({
  type: SELECT_SPIN_GAMES_NUMBER,
  payload: {
    spinId,
    gamesNumber,
  }
})

export const switchView = () => ({
  type: LOBBY_SWITCH_VIEW,
})

export const changeGameFilter = (gameType) => ({
  type: LOBBY_CHANGE_GAME_FILTER,
  payload: gameType,
})

export const changeBuyInFilter = (buyIn) => ({
  type: LOBBY_CHANGE_BUYIN_FILTER,
  payload: buyIn,
})


export const applyFilter = () => ({
  type: LOBBY_APPLY_FILTER,
})

export const resetFilter = () => ({
  type: LOBBY_RESET_FILTER,
});
