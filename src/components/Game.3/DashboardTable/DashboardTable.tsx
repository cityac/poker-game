import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Flop from '../Flop/Flop';
import TwoCardsFront from '~/components/Game/PlayerCard/TwoCards/TwoFronts';
import PlayerCard from '~/components/Game/PlayerCard/PlayerCard';
import { playerByPlace } from '~/utils';
import Card from '~/models/card';
import Player from '~/models/player';


import * as css from './DashboardTable.scss';

interface DashboardTableProps {
  tableId: string,
  players?: Player[],
  flopCards?: Card[],// not required for 'add new table'
  pot?: number, // not required for 'add new table'
  playerCards?: Card[], // not required for 'add new table'
}

export default class DashboardTable extends Component<DashboardTableProps> {
  render() {
    const {tableId, pot, flopCards, playerCards, players} =  this.props;
    
    const currentTurnProgress = players && players.find(player => player.currentUser).currentTurnProgress;

    return tableId && players
      ? (<NavLink className={css.DashboardTable} to={`/game/${tableId}`}>
          <div className={css.Labels}> 
            <div className={css.Labels_Prize} >Prizepool: $598</div>
            <div className={css.Labels_Rate}>Rate<br/>100/200</div>
          </div>
          <div className={css.Players}>
            <PlayerCard
              userX="left"
              betY="top"
              player={playerByPlace(players, 1)}
              dashboard/>
            <PlayerCard
              userX="right"
              betY="top"
              player={playerByPlace(players, 2)}
              dashboard/>
          </div>
          <div className={css.FlopWrapper}>
            <Flop label={`Pot: ${pot}`} flopCards={flopCards} dashboard/>
          </div>
          {currentTurnProgress
          ? <div className={css.PlayerTurnLabel}>
            Your Turn
          </div>
          : null}
          <div className={css.PlayerCardsWrapper}>
            {playerCards
              ? <TwoCardsFront 
                cards={playerCards} 
                type="small"
                dashboard 
                progress={currentTurnProgress}
                />
              : null}
          </div>
          </NavLink>)
        : (<NavLink className={css.DashboardTable} to={`/game`}>
            <div className={css.NewWrapper} >
              <div className={css.Button}></div>
              <div className={css.Label}>Join new game</div>
            </div>
          </NavLink>)
  }
}