import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Welcome.css';

@connect(
  ({ welcome }) => ({
    message: welcome.message,
  }),
  null,
)
export default class Welcome extends Component {
  render() {
    return (
      <div className={classes.Welcome}>
        <div className={classes.WelcomeMessage}>{this.props.message}</div>
      </div>
    );
  }
}

Welcome.propTypes = {
  message: PropTypes.string,
};
