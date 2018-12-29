import * as React from 'react';

import  icons from "~/assets/images/svg-cards.svg";

const SvgCard = (props) => {
  const { pos:  {x, y}, scale } = props;
  return (
      <use xlinkHref={`${icons}#${props.name}`} x={x} y={y} transform={`scale(${scale})`}/>
  )
};

export default SvgCard;