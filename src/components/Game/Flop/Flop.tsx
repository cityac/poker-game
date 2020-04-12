import * as React from 'react';
import { Component } from 'react';

import { isMobile } from 'react-device-detect';
import { cn } from '~/utils';

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

    const classNames = cn(
      css.Flop, 
      isMobile ? css.Flop_Mobile : css.Flop_Browser,
      dashboard ? css.Flop_Dashboard : ''
    );

    return (
      <div className={classNames}>
      {/* <button className="deal" onClick={this.dealCards}>Deal</button> */}
      <SvgFlop cards={cards} dashboard={dashboard}/>
      {!dashboard
        ? <div className={css.Flop_Label}>{this.props.label}</div>
        : null
      }
      {!dashboard
        ? <div className={css.Flop_Total}>{this.props.total}</div>
        : null
      }
      {/* <SvgFlop flop={flop} turn={turn} river={river}/> */}
      
      </div>
    );
  }
}

export default Flop;
