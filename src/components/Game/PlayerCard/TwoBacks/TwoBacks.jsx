import * as React from 'react';

import  icons from "~/assets/images/svg-cards.svg";

import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  top: 2.5vh;
  left: ${(props) => {
    return props.position === 'left' ? '7vmin' : 'n/a'
  }}

  right: ${(props) => {
    return props.position === 'right' ? '7vmin' : 'n/a'
  }}
`;

const getSVGStyle = () => {
  const mw = window.matchMedia( "(max-width: 500px)" );
  const mh = window.matchMedia( "(max-height: 500px)" );
  let style;

  if (mw.matches || mh.matches) {
    style = {
      width: '25px',
      height: '25px',
    }
  } else {
    style = {
      width: '40px',
      height: '40px',
    }
  }
  return style;
}

const TwoCardsBack = (props) => {
  let backs = [<use xlinkHref={`${icons}#back`} x="40" y="60" key="1" transform="rotate(-20, 14, 18)scale(0.1)" fill="red"/>];

  let insertFunction  = Array.prototype.unshift;
  if (props.position.x === 'left') {
    insertFunction = Array.prototype.push;
  }

  insertFunction.call(backs, <use xlinkHref={`${icons}#back`} key="2" x="180" y="60" transform="rotate(20, 26, 18)scale(0.1)" fill="red"/>)
  return (
    <Div position={props.position.x}>
      <svg 
        style={getSVGStyle(props.position)}
        viewBox="0,00,40,40"
      >
        {backs.map(item => item)}
      </svg>
  </Div>
  )
};

export default TwoCardsBack;






