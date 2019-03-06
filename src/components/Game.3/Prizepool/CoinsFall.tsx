import * as React from 'react';
import * as styled from 'styled-components';
import Coin from './Coin';

import * as css from './CoinsFall.scss';

const getBottom = () => {
  return `${getRandom(1100)}px`;
}


const getLeft = (size: string) => {
  let max = 0;
  switch(size) {
    case 'xs':
      max = 144;
      break;
    case 'sm':
      max = 130;
      break;
    case 'md':
      max = 114;
      break;
    case 'lg':
      max = 100;
      break;
  }
  return `${getRandom(max, 10)}px`;
}

const getRandom = (max, min=0) => {
  var range = Math.abs(max-min)+1;
  return Math.floor((Math.random() * range) + min);
}

const getSize = () => {
  const rand = getRandom(4);

  switch(rand) {
    case 1:
      return 'xs';
    case 2:
      return 'sm';
    case 3:
      return 'md';
    case 4:
      return 'lg';
  }
}

const generateProps = () => {
  const size = getSize();
  const bottom = getBottom();
  const left = getLeft(size);
  return {
    size,
    bottom,
    left,
  }
}

const CoinsFall = (props) => (
  <div className={css.CoinsFall}> 
  {Array.from(Array(16).keys()).map(index => <Coin key={index}  {...generateProps() }/>)}
  </div>
);


export default CoinsFall;