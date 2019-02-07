import * as React from 'react';
import * as styled from 'styled-components';
import Coin from './Coin';

import * as css from './CoinsFall.scss';

const getBottom = () => {
  return `${getRandom(1900)}px`;
}


const getLeft = (size: string) => {
  let max = 0;
  switch(size) {
    case 'xs':
      max = 154;
      break;
    case 'sm':
      max = 140;
      break;
    case 'md':
      max = 124;
      break;
    case 'lg':
      max = 110;
      break;
  }
  return `${getRandom(max)}px`;
}

const getRandom = (max) => {
  return Math.floor(Math.random() * (max + 1));
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