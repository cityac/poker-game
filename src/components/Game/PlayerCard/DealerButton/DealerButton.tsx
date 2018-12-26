import * as React from 'react';

import styled from 'styled-components';


interface BetProps {
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
  left: ${(props: {left: string}) => props.left};
  top: -2vh;
`;// border: 1px solid white;
const Letter = styled.div`
  font-size: 1vh;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DealerButton = (props) => {
  const left = props.position.x === 'left' ? '-9vw' : '6.5vw';
  return (
  <span style={{position:'relative'}}>
      <Circle left={left} >
        <Letter>D</Letter>
      </Circle>
    </span>
  )
};

export default DealerButton;