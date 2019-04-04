import { SELECT_SPIN, SELECT_NEXT_SPIN, SELECT_SPIN_GAMES_NUMBER, LOBBY_SWITCH_VIEW } from './actionTypes';
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