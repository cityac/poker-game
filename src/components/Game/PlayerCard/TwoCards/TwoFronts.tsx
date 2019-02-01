import * as React  from 'react';
import { Component } from 'react';
import SvgCard from '../../SvgCard/SvgCard';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './TwoFronts.scss';
import Card from '~/models/card';
import { join } from 'path';
import TurnProgress from '../../TurnProgress/TurnProgress';

interface TwoFrontsProps {
  cards: Card[];
  dashboard?: boolean,
  progress?: boolean,
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
  svgContainer: React.RefObject<HTMLDivElement>;
  state: TwoFrontsState;


  frontStyle = {
    height: '3.8vh',
    marginTop: '1.7vh',
    hGap: 10,
  }

  constructor(props) {
    super(props);
    this.state = {
      dashboard: props.dashboard,
      cards: props.cards.map(card => {
        card.coord = card.coord || {x: 0, y: 0};
        return card;
      }),
      style: this.getSVGStyle(props),
      cardScale: this.getSVGScale(),
    };
    this.svgContainer = React.createRef<HTMLDivElement>();
  }

  getSVGStyle(props) {
    return props.type === 'small' ? this.frontStyle : {vGap: 20, hGap: 20};
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
          xOffset = 15;
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

    const classes = [css.SVGContainer];

    if (isMobile) {
      classes.push(dashboard ? css.SVGContainer_Small_Mobile_Dashboard : css.SVGContainer_Small_Mobile);
    } else {
      classes.push(dashboard ? css.SVGContainer_Small_Browser_Dashboard : css.SVGContainer_Small_Browser);
    }
   return joinCss(classes);
  }

  renderCards = () => {
    const { cards, cardScale, style, dashboard} = this.state;
    const { type } = this.props;

    this.setCoords(cards);

    let className;
    if (type === 'small') {
      className = this.getSmallClasses();
    } else {
      className = joinCss(css.SVGContainer, isMobile ? css.SVGContainer_Large_Mobile : css.SVGContainer_Large_Browser);
    }

    return (
      <div ref={this.svgContainer} className={className}>
        {cards.map(card => (
          <SvgCard style={style}
            key={`${card.name}_${card.index}`}
            name={card.name}
            coord={card.coord}
            scale={cardScale}
            fill={style.fill}
            dashboard={dashboard}/>))}
      </div>
    )
  }

  render() {
    const { progress } = this.props;
    return (
      progress ? 
      <div className={css.TwoFronts}>
        <TurnProgress progress={progress}/>
        <div className={css.Absolute}>{this.renderCards()}</div>
      </div>
      : this.renderCards()
    );
  }
}
export default TwoCardsFront;
