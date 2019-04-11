import * as React from 'react';
import styled from 'styled-components';
import { cn } from '~/utils';

import * as css from './Coin.scss';

const CoinImg = styled.div`
  background-image: ${(props: {size: string}) => (
    `-webkit-image-set(
            url(../../../assets/images/coin_${props.size}.png) 1x,
            url(../../../assets/images/coin_${props.size}@2x.png) 2x);
        background-position: center;
        background-repeat: no-repeat;`)};

`;

const Coin = (props) => {
  // return <CoinImg size={props.size} />
  return <div style={getStyle(props.bottom, props.left)} className={cn(classBySize(props.size), props.className)} />
}

const getStyle = (bottom, left) => ({
  bottom,
  left,
})

const classBySize = (size) => {
  switch (size) {
    case 'xs': 
      return css.Coin_xs;
    case 'sm': 
      return css.Coin_sm;
    case 'md': 
      return css.Coin_md;
    case 'lg': 
      return css.Coin_lg;
    default: 
      return css.Coin_xs;
  }
}



export default Coin;