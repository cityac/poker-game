import * as React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import * as css from './Welcome.css';

interface WelcomeProps {
  message: string,
}

class Welcome extends Component<WelcomeProps>{
  render() {
    return (
      <div className={css.Welcome}>
        <div className={css.WelcomeMessage}>{this.props.message}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  message: app.message,
})
export default connect(mapStateToProps)(Welcome);