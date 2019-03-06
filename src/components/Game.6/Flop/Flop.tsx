import * as React from 'react';
import { Component } from 'react';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';
import SvgFlop from '../SvgFlop/SvgFlop';

import Card, { Coord } from '~/models/card';

class Flop extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = this.mapFromProps(props);
  }
  
  mapFromProps({flopCards, dashboard}) { 
    return { cards: flopCards, dashboard }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.mapFromProps(nextProps));
  }

  render() {
    const { cards, dashboard } = this.state;

    const classNames = joinCss(
      css.Flop, 
      isMobile ? css.Flop_Mobile : css.Flop_Browser,
      dashboard ? css.Flop_Dashboard : ''
    );

    return (
      <div className={classNames}>
      {/* <button className="deal" onClick={this.dealCards}>Deal</button> */}
      {!dashboard
        ? <div className={css.Flop_Label}>{this.props.label}</div>
        : null
      }
      {/* <SvgFlop flop={flop} turn={turn} river={river}/> */}
      <SvgFlop cards={cards} dashboard={dashboard}/>
      </div>
    );
  }
}

export default Flop;
