import * as React from 'react';

import  icons from "~/assets/images/svg-cards.svg";

import styled from 'styled-components';

const Div = styled.div`
  position: absolute;

  top: ${(props) => {
    return props.top;
  }}

  left: ${(props) => {
    return props.position === 'left' ? '7vmin' : 'unset'
  }}

  right: ${(props) => {
    return props.position === 'right' ? '7vmin' : 'unset'
  }}
`;

const getSVGStyle = () => {
  const mw = window.matchMedia( "(max-width: 600px)" );
  const mh = window.matchMedia( "(max-height: 600px)" );
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
  const position = props.position && props.position.x || 'center';
  let insertFunction  = Array.prototype.unshift;
  if (position === 'left') {
    insertFunction = Array.prototype.push;
  }

  insertFunction.call(backs, <use xlinkHref={`${icons}#back`} key="2" x="180" y="60" transform="rotate(20, 26, 18)scale(0.1)" fill="red"/>)
  return (
    <Div position={position} top={props.style && props.style.top || '4vh'}>
      <svg 
        style={getSVGStyle()}
        viewBox="0,00,40,40"
      >
        {backs.map(item => item)}
      </svg>
  </Div>
  )
};

export default TwoCardsBack;






