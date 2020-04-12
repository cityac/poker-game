import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import { cn } from '~/utils';

import * as css from './Stepper.scss';
import { inherits } from 'util';
import { string } from 'prop-types';

interface StepperProps extends React.HTMLAttributes<any> {
  value: number;
  min: number;
  max: number;
  onChangeRaise?: Function;
  styles: { color: string, opacity?: string },
  editable?: boolean,
}

const BackgroundSlider = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .05);
  border: 1px;
  border-radius: 4px;
  width: 100%;
  height: 0.5vh;
  top: -0.1vh;
`;

interface TopSliderProps {
  color?: string,
  width?: string,
  opacity?: string,
}
const TopSlider = styled.div`
  position: absolute;
  background-color: ${(props: TopSliderProps) => `${props.color}`}
  opacity: ${(props: TopSliderProps) => `${props.opacity}`}
  border: 1px;
  border-radius: 4px;
  width: ${(props: TopSliderProps) => props.width};
  height: 0.5vh;
  top: -0.1vh;
`;

const Circle = styled.div`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  background-blend-mode: overlay;
  position: absolute;
  border-radius: 50%;
  width: 5vh;
  height: 4vh;
  top: -1.7vh;
  left: ${(props: {left: string}) => `calc(${props.left} - 2.5vh);`}
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
    const { value, max, editable, styles: {color, opacity} } = this.props;
    const sliderPercent =  `${value / max * 100}%`;
    const sliderWidth = sliderPercent;
    return (
      <div className={css.Stepper}>
        {/* <button className={cn(commonCss.Button, css.Button_Stepper, css.Button_Stepper_Minus)}
          onClick={() => this.substract()}></button> */}
        <div className={css.Slider}>
          <BackgroundSlider ref={this.slider}/>
          <TopSlider width={sliderWidth} color={color} opacity={opacity || '1'}/>
          {editable
            ?<Circle 
              className={css.Circle}
              left={sliderPercent}
              onTouchMove={this.touchHandler} 
              onTouchStart={this.touchStart}
              onTouchEnd={this.touchEnd}/>
            : null}
        </div>
        {/* <button className={cn( commonCss.Button, css.Button_Stepper, css.Button_Stepper_Plus)}
          onClick={() => this.add()}></button> */}
      </div>
    );
  }
}

export default Stepper;