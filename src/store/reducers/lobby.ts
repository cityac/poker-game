import * as actionTypes from '../actions/actionTypes'

const BLUE = 'blue';
const YELLOW = 'yellow';
const GREEN = 'green';
const RED = 'red';

const mockedSpins = [
  {id: 1, order:1, color: BLUE, buyIn: 0.25, ticketsLeft: 2, prize: '$2,250', game: 'Hold\'em', gameNumber: 1},
  {id: 2,order:2, color: GREEN, buyIn: 1, ticketsLeft: 2, prize: '$2,750', game: 'Omaha', gameNumber: 1},
  {id: 3,order:3, color: YELLOW, buyIn: 3, ticketsLeft: 1, prize: '$3,250', game: 'Hold\'em', gameNumber: 1},
  {id: 4,order:4, color: RED, buyIn: 5, ticketsLeft: 3, prize: '$10,250', game: 'Hold\'em', gameNumber: 1},
  {id: 5,order:5, color: BLUE, buyIn: 10, ticketsLeft: 2, prize: '$20,250', game: 'Omaha', gameNumber: 1},
  {id: 6,order:6, color: GREEN, buyIn: 20, ticketsLeft: 1, prize: '$25,250', game: 'Omaha', gameNumber: 1},
  {id: 7,order:7, color: YELLOW, buyIn: 50, ticketsLeft: 1, prize: '$30,250', game: 'Hold\'em', gameNumber: 1},
  {id: 8,order:8, color: RED, buyIn: 100, ticketsLeft: 2, prize: '$40,250', game: 'Hold\'em', gameNumber: 1},
  {id: 9,order:9, color: BLUE, buyIn: 250, ticketsLeft: 3, prize: '$200,250', game: 'Omaha', gameNumber: 1},
];

const initialState = {
  smallView: false,
  selectedSpin: mockedSpins[0],
  spins: mockedSpins,
  filteredSpins: [...mockedSpins],
  gameTypesFilter: ['All', 'Hold\'em', 'Omaha'],
  buyInsFilter: [.25, 1, 3, 5, 10, 20, 50, 100, 250],
  gameTypes: ['All', 'Hold\'em', 'Omaha'],
  buyIns: [.25, 1, 3, 5, 10, 20, 50, 100, 250],
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

const changeGameFilter = (state, gameType) => {
  let gameTypesFilter = switchValueInArray(state.gameTypesFilter, gameType);

  if (gameType === 'All') {
    if (gameTypesFilter.indexOf('All') !== -1) {
      gameTypesFilter = [...initialState.gameTypes];
    } else {
      gameTypesFilter = [];
    }
  } else {
    if (gameTypesFilter.indexOf(gameType) !== -1 && gameTypesFilter.length >= initialState.gameTypes.length-1) {
      gameTypesFilter = [...initialState.gameTypes];
    }
    else if (gameTypesFilter.indexOf('All') !== -1) {
      gameTypesFilter = switchValueInArray(gameTypesFilter, 'All');
    }
  }

  const filteredSpins = initialState.spins.filter(spin => gameTypesFilter.indexOf(spin.game) !== -1 &&  state.buyInsFilter.indexOf(spin.buyIn) !== -1);

  return {
    ...state,
    filteredSpins,
    gameTypesFilter,
  }
}

const changeBuyInFilter = (state, buyIn) => {
  let buyInsFilter = switchValueInArray(state.buyInsFilter, buyIn);
  const filteredSpins = initialState.spins.filter(spin => buyInsFilter.indexOf(spin.buyIn) !== -1 &&  state.gameTypesFilter.indexOf(spin.game) !== -1);
  return {
    ...state,
    filteredSpins,
    buyInsFilter,
  }
}

const switchValueInArray = (list, value) => {
  const index = list.indexOf(value);
  let newList = [...list];
  if(index === -1) {
    newList.push(value);
  } else {
    newList.splice(index, 1);
  }

  return newList;
}

const applyFilter = (state) => {
  const spins = state.filteredSpins.map( (spin, i) => ({...spin, order: i+1}));
  return{
    ...state,
    spins: spins,
    selectedSpin: spins.length && spins[0],
  }
}

const resetFilter = (state) => ({
  ...state,
  spins: initialState.spins,
  filteredSpins: initialState.spins,
  buyInsFilter: initialState.buyInsFilter,
  gameTypesFilter: initialState.gameTypesFilter,
})

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
    case actionTypes.LOBBY_CHANGE_GAME_FILTER:
      return changeGameFilter(state, payload);
    case actionTypes.LOBBY_CHANGE_BUYIN_FILTER:
      return changeBuyInFilter(state, payload);
    case actionTypes.LOBBY_APPLY_FILTER:
      return applyFilter(state);
    case actionTypes.LOBBY_RESET_FILTER:
      return resetFilter(state);
    default:
    return state;
  }
};