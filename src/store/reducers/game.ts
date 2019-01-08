import { SET_GAME_BACK_PATH, SELECT_TABLE } from '../actions/actionTypes'
import Player, { PlayerStatus }from '~/models/player';
import Table, { TableStatus } from '~/models/table';
import Card from '~/models/card';


const mockPlayerCards: Array<Card> = [
  {name: "diamond_10", coord: {x: 0, y: 0}},
  {name: "club_9", coord: {x: 0, y: 0}},
];

const mockPlayers: Array<Player> = [
  {
    place: 1,
    name: 'Stanislav', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    bet: '2.0',
    balance: 98.2
  },
  {
    place: 2,
    name: 'Sergei', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    dealer: true,
    bet: '2.0',
    balance: 48.2
  },  
  {
    place: 3,
    name: 'Vitalii', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.FOLD,
    bet: '2.0',
    balance: 94.8
  },
  {
    place: 4,
    name: 'Dmitrii', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    bet: '2.0',
    balance: 66.6
  },
  {
    place: 5,
    currentUser: true,
    cards: mockPlayerCards,
    name: 'Mustafa', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    bet: '2.0',
    balance: 24.6
  },
  {
    place: 6,
    name: 'Stan', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    bet: '2.0',
    balance: 120.2
  },
  {
    place: 7,
    progress: 65,
    name: 'Viktor', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    balance: 44.6
  },
  {
    place: 8,
    name: 'Konstantin', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.AWAY,
    bet: '2.0',
    balance: 66.6
  },
  {
    place: 9,
    name: 'Igor', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    balance: 100.8
  },

  {
    place: 10,
    name: 'Mustafa', 
    avatar: '/static/media/Stan.1523e137.png',
    status: PlayerStatus.ACTIVE,
    bet: '2.0',
    balance: 24.6,
  },

];

const tables: Array<Table> = [
  {
    id: '1',
    players: mockPlayers,
    status: TableStatus.AWAY,
    playerCards: undefined,
    current: false
  },
  {
    id: '2',
    players: mockPlayers,
    status: TableStatus.PLAYING,
    playerCards: mockPlayerCards,
    current: true,
  },
  {
    id: '3',
    players: mockPlayers,
    status: TableStatus.PLAYING,
    playerCards: mockPlayerCards,
    current: false,
  },
];

const initialState = {
  message: 'This is the game',
  currentTableId: '1',
  tables: tables,
  backPath: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_GAME_BACK_PATH:
      return { ...state, backPath: action.payload };
    case SELECT_TABLE: 
      return { ...state, currentTableId: action.payload}
    default:
        return state;
  }
};
