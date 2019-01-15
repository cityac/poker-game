import * as React from 'react';
import { Component } from 'react';
import * as css from './SvgCard.scss';

import cards from '~/utils/cards';

import { joinCss } from '~/utils'


class SvgCardNew extends Component {
  svg = undefined;

  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }

  render() {
    const { 
      coord:  {x=0, y=0},
      status, 
      scale, 
      fill, 
      style, 
      name 
    } = this.props;
    
    let classNames = [ css.SvgCard ];

    const flopReg = /[Flop_.|Turn|River]/;
    if(status && status.match(flopReg)) {
      classNames.push(css.SvgCard_Flop);
    }

    classNames.push(css['SvgCard_' + status]);

    return (
      <svg style={style} ref={this.svg}>
        <use xlinkHref={`${cards[name]}#${name}`} x={x} y={y} 
        transform={`scale(${scale})`}
        className={joinCss(classNames)} 
        fill={fill} />
      </svg>
    )
  }
}

export default SvgCardNew;
