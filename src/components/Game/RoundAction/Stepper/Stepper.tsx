import * as React from 'react';
import { Component } from 'react';

import styled from 'styled-components';

import { joinCss } from '~/utils';

import * as css from './Stepper.scss';
import * as commonCss from './../Common.scss';

interface StepperProps {
  value: number,
  onChangeRaise: Function,
}

const BackgroundSlider = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px;
  border-radius: 5%;
  width: 100%;
  height: 0.3vh;
  top: -0.1vh;
`;

const TopSlider = styled.div`
  position: absolute;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2), white);
  border: 1px;
  border-radius: 5%;
  width: ${(props: {width: string}) => props.width};
  height: 0.3vh;
  top: -0.1vh;
`;
const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 4vh;
  height: 4vh;
  background-color: white;
  top: -2vh;
  left: ${(props: {left: string}) => `calc(${props.left} - 2vh);`}
`;

class Stepper extends Component <StepperProps>{
  constructor(props) { 
    super(props);
  }

  add() {
    return this.amend(10);
  }
  substract() {
    return this.amend(-10);
  }

  amend(change) {
    const { value, onChangeRaise} = this.props;
    let validate;

    if(value < 10 ) {
      validate  = (v) => Math.max(v, 0);
    } else {
      validate  = (v) => Math.min(v, 100);
    }

    // this.setState({value: validate(value + change)})
    onChangeRaise(validate(value + change));
  }


  render() {
    const { value } = this.props;
    const sliderPercent =  `${value}%`;
    const sliderWidth = `${value}%`;
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
    )
  }
}




export default Stepper;