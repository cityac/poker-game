import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Flop from '../Flop/Flop';
import TwoCardsFront from '../../Game/PlayerCard/TwoCards/TwoFronts';

import Card from '~/models/card';

import * as css from './DashboardTable.scss';

interface DashboardTableProps {
  tableId: string,
  flopCards?: Card[],// not required for 'add new table'
  pot?: number, // not required for 'add new table'
  playerCards?: Card[], // not required for 'add new table'
}

export default class DashboardTable extends Component<DashboardTableProps> {
  render() {
    const {tableId, pot, flopCards, playerCards} =  this.props;
    return (
        <NavLink className={css.DashboardTable} to={`/game/${tableId}`}>
          <div className={css.FlopWrapper}>
            <Flop label={`Pot: ${pot}`} flopCards={flopCards} dashboard/>
          </div>
          
          <div className={css.PlayerCardsWrapper}>
            {playerCards? <TwoCardsFront dashboard cards={playerCards} type="small"/> : null}
          </div>
        </NavLink>
    );
  }
}