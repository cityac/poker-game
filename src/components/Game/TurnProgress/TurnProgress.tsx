import * as React from 'react';

import styled from 'styled-components';
import { string } from 'prop-types';

const Back = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 10px;
  opacity: 0.4;
  background-color: #ffb000;
`;

interface Width {
  width: string,
  color: string,
}

interface Radius {
  leftRadius: string,
}

interface ProgressProps extends Width, Radius {}

const Progress = styled.div`
  position: absolute;
  right: 0;
  width: ${(props : ProgressProps) => props.width};
  height: inherit;
  border-top-left-radius: ${(props : ProgressProps) => props.leftRadius};
  border-bottom-left-radius: ${(props : ProgressProps) => props.leftRadius};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props : ProgressProps) => props.color};
`;

const TurnProgress = (props) => {
  const { progress } = props;
  // let progress = 80;
  
  let width = Math.ceil((100 - progress) / 10) * 10;
  if (width !== 0 && width < 20) {
    width = 20;
  } else if (width > 80) {
    width = 100;
  }
  
  let radius = 0;
  if (width === 100) {
    radius = 10;
  }
  const leftRadius = `${radius}px`;

  const style = {
    position: 'relative' as 'relative', //known issue in TypeScript
    left: 0,
    width: 'inherit',
    height: 'inherit',
  };

  let color = 'green';
  if (progress >= 50) {
    color = '#ffb000';
  }
  if (progress >= 80) {
    color = '#fc4c02';
  }
  return (
  <div style={style}>
    <Back />
    <Progress width={`${width}%`} leftRadius={leftRadius} color={color}/>
  </div>
)};

export default TurnProgress;