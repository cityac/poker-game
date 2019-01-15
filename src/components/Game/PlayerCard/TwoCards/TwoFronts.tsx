import * as React  from 'react';
import { Component } from 'react';
import SvgCardNew from '../../SvgCard/SvgCardNew';

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

class TwoCardsFront extends Component<TwoFrontsProps> {
  root: React.RefObject<HTMLDivElement>;
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
    this.root = React.createRef<HTMLDivElement>();
  }

  getSVGScale() {
    const mw = window.matchMedia( "(max-width: 600px)" );
    const mh = window.matchMedia( "(max-height: 600px)" );
  
    if (mw.matches || mh.matches) {
      return 0.3;
    }
    return 0.4;
  }

  componentDidMount() {
    this.setState({cards: [...this.state.cards]});
  }

  render() {
    const { cards, cardScale, style} = this.state;
    return (
      <div ref={this.root} 
      className={joinCss(css.TwoFronts, isMobile ? css.TwoFronts_Mobile: css.TwoFronts_Browser)}>
        {cards.map(card => (
          <SvgCardNew style={style} 
            key={`${card.name}_${card.index}`} 
            name={card.name} 
            coord={card.coord} 
            scale={cardScale} 
            fill={style.fill}/>))}
      </div>
    )
  }
}
export default TwoCardsFront;
