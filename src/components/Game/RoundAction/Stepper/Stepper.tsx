import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import { joinCss } from '~/utils';

import * as css from './Stepper.scss';
import * as commonCss from './../Common.scss';
import { inherits } from 'util';

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
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  background-blend-mode: overlay;
  background-image: linear-gradient(349deg, rgba(255, 255, 255, 0), #ffffff), linear-gradient(to bottom, #ffb600, #ffb600);
  position: absolute;
  border-radius: 50%;
  width: 3vh;
  height: 3vh;
  top: -1.5vh;
  left: ${(props: {left: string}) => `calc(${props.left} - 1.5vh);`}
`;


class Stepper extends Component <StepperProps, any>{
  slider: React.RefObject<HTMLDivElement>;
  initialState = {
    inTouch: false,
    touchPrevX: undefined,
    touchX: undefined,
  };
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.slider = React.createRef<HTMLDivElement>();
  }

  touchStart = (e) => {
    this.setState({
      inTouch: true, 
      minX: this.slider.current.parentElement.offsetLeft,
      maxX: this.slider.current.parentElement.offsetLeft + this.slider.current.clientWidth,
      touchPrevX: e.touches[0].clientX,
      touchX: e.touches[0].clientX}, () => {
    
    });
    
  }
  touchEnd = (e) => {
    this.setState({inTouch: false, touchPrevX: 0, touchX: 0});
  }

  touchHandler = (e) =>  {
    if (e.touches[0].clientX < this.state.minX ) {
      this.setState(this.initialState);
      this.props.onChangeRaise(this.props.min);
      return;
    } else if (e.touches[0].clientX > this.state.maxX) {
      this.setState(this.initialState);
      this.props.onChangeRaise(this.props.max);
      return;
    }

    this.setState({inTouch: true, touchX: e.touches[0].clientX, touchPrevX: this.state.touchX}, () => {
      const {touchX} = this.state;
      const {touchPrevX = touchX}  = this.state;

      const diff = touchX - touchPrevX;
      const pixelValue = this.props.max / this.slider.current.clientWidth;
      this.amend (Math.floor(diff * pixelValue));

    });
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
          <BackgroundSlider ref={this.slider}/>
          <TopSlider width={sliderWidth} />
          <Circle left={sliderPercent} 
            onTouchMove={this.touchHandler} 
            onTouchStart={this.touchStart}
            onTouchEnd={this.touchEnd}/>
        </div>
        <button className={joinCss( commonCss.Button, css.Button_Stepper, css.Button_Stepper_Plus)}
          onClick={() => this.add()}></button>
      </div>
    );
  }
}

export default Stepper;