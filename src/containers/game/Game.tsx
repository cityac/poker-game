import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import * as table from '../../assets/images/table.png';
import * as classes from './Game.scss';

export interface GameProps {
  message: string;
}

@connect(
  ({ game }) : GameProps => ({
    message: game.message,
  }),
  null,
)
export default class Game extends Component<GameProps> {
  render() {
    console.log(classes);
    return (
      <div className={classes.Content}>
        <div className={classes.Game}>
        </div>
      </div>
    );
  }
}
