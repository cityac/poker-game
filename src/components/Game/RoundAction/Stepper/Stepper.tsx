import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import { joinCss } from '~/utils';

import * as css from './Stepper.scss';
import * as commonCss from './../Common.scss';

interface StepperProps extends React.HTMLAttributes<any> {
  value: number;
  min: number;
  max: number;
  onChangeRaise: Function;
}

const BackgroundSlider = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .05);
  border: 1px;
  border-radius: 5%;
  width: 100%;
  height: 0.3vh;
  top: -0.1vh;
`;

const TopSlider = styled.div`
  position: absolute;
  background-image: linear-gradient(to right, rgba(255, 182, 0, 1), #ffb600);
  border: 1px;
  border-radius: 5%;
  width: ${(props: {width: string}) => props.width};
  height: 0.3vh;
  top: -0.1vh;
`;
const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 3vh;
  height: 3vh;
  background-color: #ffb600;
  top: -1.5vh;
  left: ${(props: {left: string}) => `calc(${props.left} - 1.5vh);`}
`;

class Stepper extends Component <StepperProps>{
  constructor(props) {
    super(props);
  }

  add() {
    return this.amend(1);
  }
  substract() {
    return this.amend(-1);
  }

  amend(change) {
    const { value, min, max, onChangeRaise} = this.props;
    let validate;

    if (value <= min ) {
      validate  = (v) => Math.max(v, min);
    } else {
      validate  = (v) => Math.min(v, max);
    }

    onChangeRaise(validate(value + change));
  }

  render() {
    const { value, max } = this.props;
    const sliderPercent =  `${value / max * 100}%`;
    const sliderWidth = sliderPercent;
    return (
      <div className={css.Stepper}>
        <button className={joinCss(commonCss.Button, css.Button_Stepper, css.Button_Stepper_Minus)}
          onClick={() => this.substract()}></button>
        <div className={css.Slider}>
          <BackgroundSlider />
          <TopSlider width={sliderWidth} />
          <Circle left={sliderPercent} />
        </div>
        <button className={joinCss( commonCss.Button, css.Button_Stepper, css.Button_Stepper_Plus)}
          onClick={() => this.add()}></button>
      </div>
    );
  }
}

export default Stepper;