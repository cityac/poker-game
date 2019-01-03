import * as React from 'react';
import { Component } from 'react';

import Card from './Card/Card';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';
import SvgFlop from '../SvgFlop/SvgFlop';

const flopCards = [
  {name: "diamond_jack", coord: {x: 0, y: 0}, status: 'Flop_1'},
  {name: "club_jack", coord: {x: 0, y: 0}, status: 'Flop_2'},
  {name: "spade_jack", coord: {x: 0, y: 0}, status: 'Flop_3'},
]
const turnCard = {name: "diamond_10", coord: {x: 0, y: 0}, status: 'Turn'};

const riverCard = {name: "club_9", coord: {x: 0, y: 0}, status: 'River'};

class Flop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      flop: undefined,
      turn: undefined,
      river:undefined,
    }
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
      <button onClick={this.dealCards}>Deal</button>
        <div className={css.Flop_Label}>{this.props.label}</div>
        <SvgFlop flop={flop} turn={turn} river={river}/>
      </div>
    );
  }
}

export default Flop;

