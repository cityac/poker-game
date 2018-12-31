import * as React from 'react';
import { Component } from 'react';

import Card from './Card/Card';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';
import SvgFlop from '../SvgFlop/SvgFlop';

const cards = [
  {name: "diamond_jack", pos: {x: 0, y: 0}, status: null},
  {name: "club_jack", pos: {x: 0, y: 0}, status: null},
  {name: "spade_jack", pos: {x: 0, y: 0}, status: null},
  {name: "diamond_10", pos: {x: 0, y: 0}, status: null},
  {name: "club_9", pos: {x: 0, y: 0}, status: null},
];

class Flop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }
  }

  dealCard() {
    const currentCards = this.state.cards;
    const next = currentCards.length;

    if (cards[next]) {
      cards[next].status = 'dealing';
      this.setState({cards: [...currentCards, cards[next]]});
    }
  }

  render() { 
    return (
      <div className={joinCss(css.Flop, isMobile ? css.Flop_Mobile: css.Flop_Browser)}>
      <button onClick={()=> this.dealCard()}>Next Card</button>
        <div className={css.Flop_Label}>{this.props.label}</div>
        <SvgFlop cards={this.state.cards}/>
      </div>
    );
  }
}

export default Flop;

