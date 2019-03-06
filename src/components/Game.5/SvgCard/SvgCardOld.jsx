import * as React from 'react';

import * as css from './SvgCard.scss';

import  icons from "~/assets/images/svg-cards.svg";
import { joinCss } from '~/utils'


const SvgCard = (props) => {
  const { coord:  {x, y}, status, scale, fill} = props;
  let classNames = [ css.SvgCard ];

  const flopReg = /[Flop_.|Turn|River]/;
  if(status && status.match(flopReg)) {
    classNames.push(css.SvgCard_Flop);
  }

  classNames.push(css['SvgCard_' + status]);

  return (
      <use xlinkHref={`${icons}#${props.name}`} x={x} y={y} 
      transform={`scale(${scale})`}
      className={joinCss(classNames)} 
      fill={fill} />
  )
};

export default SvgCard;
