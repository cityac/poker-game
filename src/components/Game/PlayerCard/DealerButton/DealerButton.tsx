import * as React from 'react';

import styled from 'styled-components';
import Position from '../position';

interface DealerButtonProps {
  position: Position
}

const Circle = styled.div`
  color: black;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  margin: 0;
  width: 2vh;
  height: 2vh;
  position: absolute;
  top: -2vh;

  left: ${(props: {position: string}) => {
    return props.position === 'left' ? '7vmin' : 'n/a'
  }}

  right: ${(props: any) => {
    return props.position === 'right' ? '7vmin' : 'n/a'
  }}
`;

const Letter = styled.div`
  font-size: 1vh;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DealerButton = (props: DealerButtonProps) => {
  return (
  <span style={{position:'relative'}}>
      <Circle position={props.position.x}>
        <Letter>D</Letter>
      </Circle>
    </span>
  )
};

export default DealerButton;