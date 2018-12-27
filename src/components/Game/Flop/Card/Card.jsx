import * as React from 'react';

import  icons from "~/assets/images/svg-cards.svg";

const getStyle = () => {
  const mw = window.matchMedia( "(max-width: 500px)" );
  const mh = window.matchMedia( "(max-height: 500px)" );
  let style;

  if (mw.matches || mh.matches) {
    style = {
      width: '50px',
      height: '80px',
    }
  } else {
    style = {
      width: '100px',
      height: '150px',
    }
  }
  return style;
}

const Card = (props) => {
  return (
    <svg viewBox="35,0,100,270" style={getStyle()}>
      <use xlinkHref={`${icons}#${props.name}`} x="0" y="0"/>
   </svg>
  )
};

export default Card;