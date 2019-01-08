import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className={classes.Welcome}>
        <div className={classes.WelcomeMessage}>{this.props.message}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ welcome }) => ({
  message: welcome.message,
})
export default connect(mapStateToProps)(Welcome);