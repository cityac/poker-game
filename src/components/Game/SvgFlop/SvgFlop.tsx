import * as React  from 'react';
import { Component, RefObject } from 'react';
import SvgCard from '../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './SvgFlop.scss';
import Card from '../../../models/card';

interface SvgFlopProps {
  flop: Card[];
  turn: Card;
  river: Card;
}

interface SvgFlopState {
  cards: any[];
  // cardScale: number;
}

const setCoords = (cards, width, height, scale) => {
  const svgWidht = width / scale;
  // const svgHeight = height / scale;

  const cardWidth = 72;
  const cardHeight = 100;
  // const gap = (svgHeight / 2 - cardHeight) / 2;
  const gap = 20;

  const hCenter = svgWidht / 2;
  // const vCenter = svgHeight / 2;

  cards.forEach((card, index) => {
    let xOffset;
    switch (index) {
      case 0:
        xOffset = (-2.5 * cardWidth - 2 * gap);
      break;
      case 1:
        xOffset = (-1.5 * cardWidth - gap);
      break;
      case 2:
        xOffset = (-0.5 * cardWidth);
      break;
      case 3:
        xOffset = (0.5 * cardWidth + gap);
      break;
      case 4:
        xOffset = (1.5 * cardWidth + 2 * gap);
      break;
      default:
      xOffset = 0;
      break;
    }

    if (card) {
      card.coord.x = hCenter + xOffset;
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
    //  cardScale: this.getSVGScale(),
    };
    this.root = React.createRef<SVGSVGElement>();
  }

  getSVGScale() {
    const mw = window.matchMedia( '(max-width: 600px)' );
    const mh = window.matchMedia( '(max-height: 600px)' );

    if (mw.matches || mh.matches || isMobile) {
      return  0.5;
    }

    return 0.8;
  }

  componentDidMount() {
    this.setState({cards: [...this.state.cards]});
  }

  static getDerivedStateFromProps({flop, turn, river}, state) {
    const cards = flop ? [...flop] : [];
    turn && cards.push(turn);
    river && cards.push(river);

    return {...state, cards};
  }

  render() {
    const { cards } = this.state;
    const cardScale = this.getSVGScale();
    if (this.root.current) {
      setCoords(cards, this.root.current.clientWidth, this.root.current.clientHeight,  cardScale);
    }

    return (
      <div className={joinCss(css.SvgFlop, isMobile ? css.SvgFlop_Mobile : css.SvgFlop_Browser)}>
        <svg ref={this.root} width={480}>
          {cards.map(card =>
            (card ? <SvgCard name={card.name} key={card.name} coord={card.coord} scale={cardScale} status={card.status}/> : null))}
        </svg> 
      </div>
    );
  }
}
export default SvgFlop;
