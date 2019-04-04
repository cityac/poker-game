import * as actionTypes from '../actions/actionTypes'

const BLUE = 'blue';
const YELLOW = 'yellow';
const GREEN = 'green';
const RED = 'red';
const mockedSpins = [
  {id: 1, order:1, color: BLUE, buyIn: 0.25, ticketsLeft: 2, prize: '$2,250', game: 'Hold\'em', gameNumber: 1},
  {id: 2,order:2, color: GREEN, buyIn: 0.5, ticketsLeft: 2, prize: '$2,750', game: 'Omaha', gameNumber: 1},
  {id: 3,order:3, color: YELLOW, buyIn: 5, ticketsLeft: 1, prize: '$3,250', game: 'Hold\'em', gameNumber: 1},
  {id: 4,order:4, color: RED, buyIn: 20, ticketsLeft: 3, prize: '$10,250', game: 'Hold\'em', gameNumber: 1},
  {id: 5,order:5, color: BLUE, buyIn: 40, ticketsLeft: 2, prize: '$20,250', game: 'Omaha', gameNumber: 1},
  {id: 6,order:6, color: GREEN, buyIn: 60, ticketsLeft: 1, prize: '$25,250', game: 'Hold\'em', gameNumber: 1},
  {id: 7,order:7, color: YELLOW, buyIn: 75, ticketsLeft: 1, prize: '$30,250', game: 'Omaha', gameNumber: 1},
  {id: 8,order:8, color: RED, buyIn: 90, ticketsLeft: 2, prize: '$40,250', game: 'Hold\'em', gameNumber: 1},
  {id: 9,order:9, color: BLUE, buyIn: 100, ticketsLeft: 3, prize: '$200,250', game: 'Omaha', gameNumber: 1},
];
const initialState = {
  smallView: false,
  selectedSpin: mockedSpins[1],
  spins: mockedSpins,
}

const findSpin = (spins, id) => {
  return spins.find(spin => spin.id === id);
}

const getNextSpin = ({spins, selectedSpin}, next) => {
  const lastIndex = spins.length - 1;
  const index = spins.indexOf(selectedSpin);
  let newIndex = next ? index + 1 : index - 1;

  if (newIndex < 0 ) {
    newIndex = 0
  } else if (newIndex > lastIndex) {
    newIndex = lastIndex;
  }

  return spins[newIndex];
}

const selectSpin = (state, id) => ({
    ...state,
    selectedSpin: findSpin(state.spins, id) || {},
  });

  const selectNextSpin = (state, next) => {
    const nextSpin = getNextSpin(state, next);
    return {
        ...state,
        selectedSpin: nextSpin,
      }
  };

const selectSpinGamesNumber = (state, {spinId, gamesNumber}) => {
  const selectedSpin = findSpin(state.spins, spinId);
  selectedSpin.gameNumber = gamesNumber;

  return {
    ...state,
    selectedSpin: selectedSpin,
    spins: state.spins.map(spin => {
      if (spin.id === spinId) {
        return selectedSpin;
      } else {
        return spin;
      }

    })
  }
}

const lobbySwitchView = (state) => ({
  ...state,
  smallView: !state.smallView,
});

export default (state = initialState, {payload, type}) => {
  switch(type) {
    case actionTypes.SELECT_SPIN:
      return selectSpin(state, payload);
    case actionTypes.SELECT_NEXT_SPIN:
      return selectNextSpin(state, payload);
    case actionTypes.SELECT_SPIN_GAMES_NUMBER: 
      return selectSpinGamesNumber(state, payload);
    case actionTypes.LOBBY_SWITCH_VIEW:
      return lobbySwitchView(state);
  }
  return state;
};