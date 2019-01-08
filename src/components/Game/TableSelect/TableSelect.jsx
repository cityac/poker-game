import * as React from 'react';
import { Component } from 'react';

import { joinCss } from '~/utils';

import TwoCardsFront from '../PlayerCard/TwoCards/TwoFronts';
// import TwoCardsBack from '../PlayerCard/TwoCards/TwoBacks';

import { TableStatus } from '~/models/table';
import * as css from './TableSelect.scss';

const frontStyle = {
  height: '3.8vh',
  marginTop: '1vh',
  hGap: 10,
}

const backStyle = {
  height: '3vh',
  fill: 'red',
  hGap: -100,
  vGap: 10,

}

const backCards = [
  {name: "back", index: "1"},
  {name: "back", index: "2"},
];

export default class TableSelect extends Component {
  renderSelect() {
    const { table } = this.props;
    if (table) {
      const { status, playerCards, current } = table;
      const classNames = joinCss(css.TableSelect, current ? css.TableSelect_Current : '');
      return (
        <div className={classNames}>
          {status === TableStatus.AWAY 
            ? (<div className={css.TableSelect_Away}>
                <div className={css.TableSelect_Away_Label}>{table.status}</div>
                <TwoCardsFront cards={backCards} style={backStyle} />
              </div>)
            : <TwoCardsFront cards={playerCards} style={frontStyle} />
          }
        </div>)
    }

    return (<button className={joinCss(css.TableSelect, css.TableSelect_New)} />)
    
  }

  render() {
    return this.renderSelect();
  }
}