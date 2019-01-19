import * as React from 'react';
import { Component } from 'react';

import { joinCss } from '~/utils';
import TwoCardsFront from '../PlayerCard/TwoCards/TwoFronts';
import TableAway from './TableAway';
import { PlayerStatus } from '~/models/player';
import Table from '~/models/table';
import * as css from './TableSelect.scss';
import { selectTable } from '../../../store/actions';

const frontStyle = {
  height: '3.8vh',
  marginTop: '1vh',
  hGap: 10,
  
}

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
    if (table) {
      const { playerCards, playerStatus, id } = table;
      const current = currentTableId === id;
      const classNames = joinCss(css.TableSelect, current ? css.TableSelect_Current : '');
      return (
        <div className={classNames} onClick={() => this.selectTable()}>
          {playerStatus === PlayerStatus.AWAY 
            ? (<div className={css.TableSelect_Away}>
                <div className={css.TableSelect_Away_Label}>Away</div>
                <TableAway style={backStyle}/>
              </div>)
            : <TwoCardsFront cards={playerCards} style={frontStyle} type={'small'} />
          }
        </div>)
    }

    return (<button className={joinCss(css.TableSelect, css.TableSelect_New)} />)
  }

  render() {
    return this.renderSelect();
  }
}