import * as React  from 'react';
import { Component } from 'react';
import SvgCard from '../../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './TwoFronts.scss';
import Card from '~/models/card';
import { join } from 'path';

interface TwoFrontsProps {
  cards: Card[];
  dashboard?: boolean,
  style?: TwoFrontsStyle;
  type: string; // small | large
}

interface TwoFrontsStyle {
  height?: string;
  fill?: string;
  hGap?: number;
  vGap?: number;
}

interface TwoFrontsState {
  cards: any[];
  dashboard: boolean,
  cardScale: number;
  style: TwoFrontsStyle;
}

class TwoCardsFront extends Component<TwoFrontsProps, TwoFrontsState> {
  root: React.RefObject<HTMLDivElement>;
  state: TwoFrontsState;
  constructor(props) {
    super(props);
    this.state = {
      dashboard: props.dashboard,
      cards: props.cards.map(card => {
        card.coord = card.coord || {x: 0, y: 0};
        return card;
      }),
      style: props.style || {vGap: 20, hGap: 20},
      cardScale: this.getSVGScale(),
    };
    this.root = React.createRef<HTMLDivElement>();
  }

  getSVGScale() {
    const mw = window.matchMedia( '(max-width: 600px)' );
    const mh = window.matchMedia( '(max-height: 600px)' );

    if (isMobile) {
      return this.props.type === 'small' ? 0.25 : 0.5;
    }

    return this.props.type === 'small' ? 0.4 : 0.8;
  }

  setCoords = (cards) => {
    cards.forEach((card, index) => {
      let xOffset;
      switch (index) {
        case 0:
          xOffset = 10;
        break;
      }

      if (card) {
        card.coord = card.coord || {};
        card.coord.x = xOffset;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      cards: nextProps.cards.map(card => {
        card.coord = card.coord || {x: 0, y: 0};
        return card;
      }),
    });
  }
  
  componentDidMount() {
    this.setState({cards: [...this.state.cards]});
  }

  getSmallClasses() {
    const { dashboard} = this.state;

    const classes = [css.TwoFronts];

    if (isMobile) {
      classes.push(dashboard ? css.TwoFronts_Small_Mobile_Dashboard : css.TwoFronts_Small_Mobile);
    } else {
      classes.push(dashboard ? css.TwoFronts_Small_Browser_Dashboard : css.TwoFronts_Small_Browser);
    }
   return joinCss(classes);
  }

  render() {
    const { cards, cardScale, style, dashboard} = this.state;
    const { type } = this.props;

    this.setCoords(cards);

    let className;
    if (type === 'small') {
      className = this.getSmallClasses();
    } else {
      className = joinCss(css.TwoFronts, isMobile ? css.TwoFronts_Large_Mobile : css.TwoFronts_Large_Browser);
    }
    return (
      <div ref={this.root}
      className={className}>
        {cards.map(card => (
          <SvgCard style={style}
            key={`${card.name}_${card.index}`}
            name={card.name}
            coord={card.coord}
            scale={cardScale}
            fill={style.fill}
            dashboard={dashboard}/>))}
      </div>
    );
  }
}
export default TwoCardsFront;
