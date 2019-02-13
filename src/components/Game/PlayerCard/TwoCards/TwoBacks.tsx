import * as React from 'react';

import cards from '~/utils/cards';

import styled from 'styled-components';

interface DivProps {
  top: string,
  position:string,
}
const Div = styled.div`
  position: absolute;

  top: ${(props:DivProps) => {
    return props.top;
  }}

  left: ${(props:DivProps) => {
    return props.position === 'left' ? '8vmin' : 'unset'
  }}

  right: ${(props:DivProps) => {
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
    <Div className={props.className} position={position} top={props.style && props.style.top || '4vh'}>
      <svg 
        style={svgStyle}>
        {backs}
      </svg>
  </Div>
  )
};

export default TwoCardsBack;






