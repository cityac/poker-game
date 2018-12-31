import * as React from 'react';

import * as css from './SvgCard.scss';

import  icons from "~/assets/images/svg-cards.svg";


const SvgCard = (props) => {
  const { pos:  {x, y}, status, scale} = props;
  
  return (
      <use xlinkHref={`${icons}#${props.name}`} x={x} y={y} 
      transform={`scale(${scale})`}
      className={status === 'dealing' ? css.SvgCard_Dealing : status === 'delt' ? css.SvgCard : ''} />
  )
};

export default SvgCard;


// import * as React from 'react';
// import * as css from './SvgCard.scss';

// // import styled from 'styled-components';
// import  icons from "~/assets/images/svg-cards.svg";

// const SvgCard = (props) => {
//   const { pos:  {x, y} } = props;
//   return (
//       <use className={css.SvgCard} xlinkHref={`${icons}#${props.name}`} x={x} y={y} />
//   )
// };

// export default SvgCard;
