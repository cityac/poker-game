import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { switchGameMode } from '../../store/actions';
import { toggleFullScreen } from '../../utils/fullscreenUtils';

import * as table from '../../assets/images/table.png';
import * as classes from './Game.scss';

export interface GameProps {
  message: string;
  switchGameModeDispatch?(on: boolean): void,
}

@connect(
  ({ game }) : GameProps => ({
    message: game.message,
  }),
  dispatch => ({
    switchGameModeDispatch: (on: boolean): void => dispatch(switchGameMode(on)),
  }),
)
export default class Game extends Component<GameProps> {

  componentDidMount() {
    toggleFullScreen(true);
    this.props.switchGameModeDispatch(true);
  }

  render() {
    console.log(classes);
    return (
      <div className={classes.Content}>
        <div className={classes.Game}>
          <NavLink className={classes.NavLink}to='/real-money'>Back</NavLink>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    toggleFullScreen();
    this.props.switchGameModeDispatch(false);
  }
}
