import * as React from 'react';
import { Component } from 'react';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';
import SvgFlop from '../SvgFlop/SvgFlop';

import Card from '~/models/card';

const flopCards: Array<Card> = [
  {name: "diamond_6", coord: {x: 0, y: 0}, status: 'Flop_1'},
  {name: "club_k", coord: {x: 0, y: 0}, status: 'Flop_2'},
  {name: "spade_q", coord: {x: 0, y: 0}, status: 'Flop_3'},
]
const turnCard = {name: "spade_10", coord: {x: 0, y: 0}, status: 'Turn'};

const riverCard = {name: "club_j", coord: {x: 0, y: 0}, status: 'River'};

class Flop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dealCards = () => {
    const { flop, turn, river} = this.state;
    if (!flop) {
      this.setState({flop: flopCards})
    } else if(!turn) {
      this.setState({turn: turnCard});
    } else if(!river) {
      this.setState({river: riverCard});
    }
  }

  render() { 
    const { flop, turn, river} = this.state;
    return (
      <div className={joinCss(css.Flop, isMobile ? css.Flop_Mobile: css.Flop_Browser)}>
      <button className="deal" onClick={this.dealCards}>Deal</button>
        <div className={css.Flop_Label}>{this.props.label}</div>
        <SvgFlop flop={flop} turn={turn} river={river}/>
      </div>
    );
  }
}

export default Flop;

