import * as React from 'react';

// import  icons from "~/assets/images/svg-cards.svg";

import cards from '~/utils/cards';

import styled from 'styled-components';

const Div = styled.div`
  position: absolute;

  top: ${(props) => {
    return props.top;
  }}

  left: ${(props) => {
    return props.position === 'left' ? '8vmin' : 'unset'
  }}

  right: ${(props) => {
    return props.position === 'right' ? '8vmin' : 'unset'
  }}
`;

const getSVGStyle = () => {
  const mw = window.matchMedia( "(max-width: 600px)" );
  const mh = window.matchMedia( "(max-height: 600px)" );
  let style;

  if (mw.matches || mh.matches) {
    style = {
      width: '30px',
      height: '25px',
      scale: 0.4,
    }
  } else {
    style = {
      width: '40px',
      height: '40px',
      scale: 0.5,
    }
  }
  return style;
}

const TwoCardsBack = (props) => {
  let source;
  const position = props.position && props.position.x || 'center';
  const svgStyle = getSVGStyle();
  if (position === 'left' || position === 'center') {
    source = `${cards.back_cards}#back_cards`;
    
  } else {
    source = `${cards.back_cards_reverse}#back_cards_reverse`;
  }

  const backs = <use xlinkHref={source} transform={`scale(${svgStyle.scale})`} key="1" />;

  return (
    <Div position={position} top={props.style && props.style.top || '4vh'}>
      <svg 
        style={svgStyle}
      >
        {backs}
      </svg>
  </Div>
  )
};

export default TwoCardsBack;






