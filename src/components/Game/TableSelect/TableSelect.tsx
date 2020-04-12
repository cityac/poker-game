import * as React from 'react';
import { Component } from 'react';

import { cn } from '~/utils';
import TwoCardsFront from '../PlayerCard/TwoCards/TwoFronts';
import TableAway from './TableAway';
import { PlayerStatus } from '~/models/player';
import Table from '~/models/table';
import * as css from './TableSelect.scss';

const backStyle = {
  height: '3vh',
  width: '7vh',
  fill: 'red',
  hGap: -100,
  vGap: 10,
}

interface TableSelectProps {
  onSelect: Function,
  // TODO change
  table?: Table, // not required for add new Table button 
  currentTableId?: string, // not required for add new Table button
}

export default class TableSelect extends Component<TableSelectProps> {
  selectTable = () => {
    const { onSelect, table: {id}} = this.props;
    onSelect(id)
  }

  renderSelect() {
    const { table, currentTableId } = this.props;
    const players  = table && table.players;
    const currentTurnProgress = players && players.find(player => player.currentUser).currentTurnProgress;
    if (table) {
      const { playerCards, playerStatus, id } = table;
      const current = currentTableId === id;
      const classNames = cn(css.TableSelect, current ? css.TableSelect_Current : '');
      return (
        <div className={classNames} onClick={() => this.selectTable()}>
          {playerStatus === PlayerStatus.AWAY 
            ? (<div className={css.TableSelect_Away}>
                <div className={css.TableSelect_Away_Label}>Away</div>
                <TableAway style={backStyle}/>
              </div>)
            : <TwoCardsFront cards={playerCards} type="small" progress={currentTurnProgress}/>
          }
        </div>)
    }

    return (<button className={cn(css.TableSelect, css.TableSelect_New)} />)
  }

  render() {
    return this.renderSelect();
  }
}