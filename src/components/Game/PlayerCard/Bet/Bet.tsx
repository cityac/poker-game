import * as React from 'react';

import styled from 'styled-components';

import * as img from '~/assets/images/chip.png';
import Position from '../position';

interface BetProps {
  position: Position
  amount: string,
}

const StyledBet= styled.div`
  &::before {
    content: "";
    display: inline-block;
    height: 1em;
    width: 1em;
    margin-right: .1rem;
    background-size: cover;
    background-image: url(${img});
  }
  position: absolute;
  top: ${(props: {top: string}) => props.top}
  left: ${(props: any) => props.left}
  display: flex;
  font-size: 2vh;
  justify-content: center;
  align-items: center;
  
`;

const Bet = (props: BetProps) => {
  const top = props.position.y === 'bottom' ? '4vh' : props.position.y === 'center' ? '2vh' : '0';
  const left = props.position.x === 'left' ? '0' : '18vw';
  return (
    <StyledBet left={left} top={top}>{props.amount}</StyledBet>
  )
};

export default Bet;