import * as React from 'react';

import styled from 'styled-components';

import * as img from '~/assets/images/chip.png';

import Position from '../position';

interface BetProps {
  position: Position;
  amount: string;
}

const StyledBet = styled.div`
  &::after {
    content: "";
    display: inline-block;
    height: 1em;
    width: 1em;
    margin-left: .1rem;
    background-size: cover;
    background-image: url(${img});
  }
  position: absolute;
  top: ${(props: {top: string}) => props.top}

  left: ${(props: any) => {
    return props.position === 'left' ? '14vmin' : props.position === 'center' ? '50%' : 'unset';
  }}

  right: ${(props: any) => {
    return props.position === 'right' ? '14vmin' : 'unset';
  }}

  transform: ${(props: any) => {
    return props.position === 'center' ? 'translate(-50%);' : 'unset';
  }}

  display: flex;
  font-size: 2vh;
  justify-content: center;
  align-items: center;
`;

const Bet = (props: BetProps) => {
  let top = props.position.y === 'bottom' ? '4vh' : props.position.y === 'center' ? '2vh' : '0';

  if (props.position.x === 'center') {
    top = props.position.y === 'top' ? '-3vh' : '12vh';
  }

  return (
    <StyledBet position={props.position.x} top={top}>{props.amount}</StyledBet>
  );
};

export default Bet;