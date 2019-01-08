import { SET_GAME_BACK_PATH, SELECT_TABLE, PRESELECT_RAISE} from '../actions/actionTypes'
import Player, { PlayerStatus }from '~/models/player';
import User from '~/models/user';
import Table, { TableStatus } from '~/models/table';
import Card from '~/models/card';

interface State {
  tables: Array<Table>,
  currentTable: Table,
  backPath: string,
}

const findUser = (player: Player): boolean => player.currentUser;

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
    currentUser: true,
    cards: mockPlayerCards,
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

const mockTables: Array<Table> = [
  {
    id: '1',
    players: mockPlayers,
    // status: TableStatus.AWAY,
    // playerCards: undefined,
    current: false,
    bet: 10,
    pot: 20.2,

    user: mockPlayers.find(findUser) as User,
  },
  {
    id: '2',
    players: mockPlayers,
    // status: TableStatus.PLAYING,
    // playerCards: mockPlayerCards,
    current: true,
    bet: 20,
    pot: 50,
    user: mockPlayers.find(findUser) as User,
  },
  {
    id: '3',
    players: mockPlayers,
    // status: TableStatus.PLAYING,
    // playerCards: mockPlayerCards,
    current: false,
    bet: 80,
    pot: 190,
    user: mockPlayers.find(findUser) as User,
  },
];

const initialState: State = {
  tables: mockTables,
  currentTable: {
    players: mockTables[0].players,
    id: '1',
    pot: 20.2,
    bet: 10,
    user: mockTables[0].players.find(findUser) as User,
    current: true,
  },
  backPath: null,
};

function selectTable(state: State, payload: any): State {
  const id = payload;
  const table = state.tables.find(el => el.id === id);
  const players = table ? table.players : [];
  const bet = table.bet;
  const pot = table.pot;
  const user = table.players.find(findUser) as User;
  const currentTable: Table = {
    id,
    players,
    bet,
    pot,
    user,
    current: true,
  }
  return {...state, currentTable};
}

export default (state = initialState, action): State => {
  switch(action.type) {
    case SET_GAME_BACK_PATH:
      return { ...state, backPath: action.payload };
    case SELECT_TABLE: 
      return selectTable(state, action.payload);
    case PRESELECT_RAISE:
      return {...state, currentTable: {...state.currentTable, user: {...state.currentTable.user, raiseValue: action.payload}}}
    default:
        return state;
  }
};
