import * as React  from 'react';
import { Component, RefObject } from 'react';
import SvgCard from '../../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './TwoFronts.scss';

interface TwoFrontsProps {

}

interface TwoFrontsState {
  cards: Array<any>,
  cardScale: number,
}

const cards = [
  {name: "diamond_10", coord: {x: 0, y: 0}},
  {name: "club_9", coord: {x: 0, y: 0}},
];

const setCoords = (cards, width, height, scale) => {
  const svgWidht = width / scale;
  const svgHeight = height / scale;

  const cardWidth = 169.075;
  const cardHeight = 244.64;
  // const gap = (svgHeight / 2 - cardHeight) / 2;
  const gap = 20;

  
  const hCenter = svgWidht / 2;
  const vCenter = svgHeight / 2;

  cards.forEach((card, index) => {
    let xOffset;
    switch(index) {
      case 0:
        xOffset = (-1 * cardWidth - 0.5 * gap)
      break;
      case 1:
        xOffset = (0.5 * gap) 
      break;
      default:
      xOffset = 0;
      break;
    }

    card.coord.x = hCenter + xOffset;
    card.coord.y = gap;

    if (index > 2) {
      card.coord.y += (vCenter - gap);
    }
  });
}

class TwoFronts extends Component<TwoFrontsProps> {
  root: React.RefObject<SVGSVGElement>;
  state: TwoFrontsState;
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardScale: this.getSVGScale(),
    }
    this.root = React.createRef<SVGSVGElement>();
  }

  getSVGScale() {
    const mw = window.matchMedia( "(max-width: 600px)" );
    const mh = window.matchMedia( "(max-height: 600px)" );
  
    if (mw.matches || mh.matches) {
      return 0.15;
    }
    return 0.2;
  }

  componentDidMount() {
    setCoords(cards, this.root.current.clientWidth, this.root.current.clientHeight, this.state.cardScale);
    this.setState({cards});
  }

  render() {
    const { cards, cardScale } = this.state;
    return (
      <div className={joinCss(css.TwoFronts, isMobile ? css.TwoFronts_Mobile: css.TwoFronts_Browser)}>
        <svg ref={this.root}>
          {cards.map(card => (<SvgCard name={card.name} key={card.name} coord={card.coord} scale={cardScale} />))}
        </svg> 
      </div>
    )
  }
}
export default TwoFronts;
