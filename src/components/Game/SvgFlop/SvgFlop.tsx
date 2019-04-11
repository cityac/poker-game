import * as React  from 'react';
import { Component, RefObject } from 'react';
import SvgCard from '../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { cn } from '~/utils';

import * as css from './SvgFlop.scss';
import Card from '../../../models/card';

interface SvgFlopProps {
  // flop: Card[];
  // turn: Card;
  // river: Card;
  cards: Card[];
  dashboard: boolean,
}

interface SvgFlopState {
  cards: any[];
  dashboard: boolean;
  // cardScale: number;
}

const setCoords = (cards, width, height, scale) => {
  const svgWidht = width / scale;
  // const svgHeight = height / scale;

  const cardWidth = 72;
  const cardHeight = 100;
  // const gap = (svgHeight / 2 - cardHeight) / 2;
  const gap = 10;

  const hCenter = svgWidht / 2;
  // const vCenter = svgHeight / 2;

  cards.forEach((card, index) => {
    let xOffset;
    switch (index) {
      // case 0:
      //   xOffset = (-2.5 * cardWidth - 2 * gap);
      // break;
      // case 1:
      //   xOffset = (-1.5 * cardWidth - gap);
      // break;
      // case 2:
      //   xOffset = (-0.5 * cardWidth);
      // break;
      // case 3:
      //   xOffset = (0.5 * cardWidth + gap);
      // break;
      // case 4:
      //   xOffset = (1.5 * cardWidth + 2 * gap);
      // break;
      // default:
      // xOffset = 0;
      // break;
    }

    xOffset = index * (cardWidth + gap) + 20;

    if (card) {
      card.coord = card.coord || {};
      card.coord.x = xOffset;
      card.coord.y = gap;

      if (index > 2) {
        //card.coord.y += (vCenter - gap);
      }
    }
  });
};

class SvgFlop extends Component<SvgFlopProps> {
  root: React.RefObject<SVGSVGElement>;
  state: SvgFlopState;
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      dashboard: false,
    //  cardScale: this.getSVGScale(),
    };
    this.root = React.createRef<SVGSVGElement>();
  }

  getSVGStyle() {
    let scale;
    let width = 0;

    const mw = window.matchMedia( '(max-width: 600px)' );
    const mh = window.matchMedia( '(max-height: 600px)' );

    if (mw.matches || mh.matches || isMobile) {
      scale = this.state.dashboard ? 0.3 : 0.5;
    } else {
      scale = this.state.dashboard ? 0.5 : 0.8;
    }

    if(this.state.cards && this.state.cards.length) {
      width = this.state.cards && (this.state.cards.length * (72 + 20) - 10) * scale;
    }

    // if (this.state.dashboard) {
    //   width = this.state.cards && this.state.cards.length * 35;
    // } else {
      
    // }


    return {
      scale,
      width,
    }

    
  }

  componentDidMount() {
    this.setState({cards: [...this.state.cards]});
  }

  // static getDerivedStateFromProps({flop, turn, river}, state) {
  //   const cards = flop ? [...flop] : [];
  //   turn && turn.length && cards.push(turn[0]);
  //   river && river.length && cards.push(river[0]);

  //   return {...state, cards};
  // }

  static getDerivedStateFromProps({cards = [], dashboard}, state) {
    return {...state, cards, dashboard};
  }

  render() {
    const { cards, dashboard } = this.state;
    const style = this.getSVGStyle();
    if (this.root.current) {
      setCoords(cards, this.root.current.clientWidth, this.root.current.clientHeight,  style.scale);
    }

    const classNames = cn(
      css.SvgFlop, 
      isMobile ? css.SvgFlop_Mobile : css.SvgFlop_Browser,
      dashboard ? css.SvgFlop_Dashboard : ''
    );

    return (
      <div className={classNames}>
        <svg ref={this.root} width={style.width}>
          {cards.map(card =>
            (card ? <SvgCard  key={card.name} { ...card } scale={style.scale} dashboard={dashboard}/> : null))}
        </svg> 
      </div>
    );
  }
}
export default SvgFlop;
