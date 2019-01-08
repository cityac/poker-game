import * as React  from 'react';
import { Component, RefObject } from 'react';
import SvgCard from '../../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './TwoFronts.scss';
import Card from '~/models/card';

interface TwoFrontsProps {
  cards: Array<Card>,
  style?: TwoFrontsStyle,
}

interface TwoFrontsStyle {
  height?: string, 
  fill?: string, 
  hGap?: number,
  vGap?: number,
}

interface TwoFrontsState {
  cards: Array<any>,
  cardScale: number,
  style: TwoFrontsStyle,
}



const setCoords = (cards, width, height, scale, style:TwoFrontsStyle) => {
  const svgWidht = width / scale;
  const svgHeight = height / scale;

  const cardWidth = 169.075;
  const cardHeight = 244.64;
  // const gap = (svgHeight / 2 - cardHeight) / 2;
  // const gap = 20;

  
  const hCenter = svgWidht / 2;
  const vCenter = svgHeight / 2;

  cards.forEach((card, index) => {
    let xOffset;
    switch(index) {
      case 0:
        xOffset = (-1 * cardWidth - 0.5 * style.hGap)
      break;
      case 1:
        xOffset = (0.5 * style.hGap) 
      break;
      default:
      xOffset = 0;
      break;
    }

    card.coord.x = hCenter + xOffset;
    card.coord.y = style.vGap;

    if (index > 2) {
      card.coord.y += (vCenter - style.vGap);
    }
  });
}

class TwoCardsFront extends Component<TwoFrontsProps> {
  root: React.RefObject<SVGSVGElement>;
  state: TwoFrontsState;
  constructor(props) {
    super(props);
    this.state = {
      cards: props.cards.map(card => {
        card.coord = card.coord || {}
        return card;
      }),
      style: props.style || {vGap: 20, hGap: 20},
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
    setCoords(this.state.cards, this.root.current.clientWidth, this.root.current.clientHeight, this.state.cardScale, this.state.style);
    this.setState({cards: [...this.state.cards]});
  }

  render() {
    const { cards, cardScale, style} = this.state;
    return (
      <div className={joinCss(css.TwoFronts, isMobile ? css.TwoFronts_Mobile: css.TwoFronts_Browser)}>
        <svg ref={this.root} style={style}>
          {cards.map(card => (<SvgCard name={card.name} key={`${card.name}_${card.index}`} coord={card.coord} scale={cardScale} fill={style.fill}/>))}
        </svg> 
      </div>
    )
  }
}
export default TwoCardsFront;
