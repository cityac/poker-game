import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import table from '../../assets/images/table.png';

import classes from './Game.css';

@connect(
  ({ game }) => ({
    message: game.message,
  }),
  null,
)
export default class Game extends Component {
  render() {
    return (
      <div className={classes.Game}>
        <img src={table} className={classes.Game} />
      </div>
    );
  }
}

Game.propTypes = {
  message: PropTypes.string,
};
