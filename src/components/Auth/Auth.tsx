import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as classes from './Auth.css';

import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions';

export interface AuthProps {
  onLogin(path: string): void;
  isAuthenticated: boolean;
  authRedirectPath: string;
}

class Auth extends Component<AuthProps> {
  login = (path) => {
    this.props.onLogin(path);
  };

  render() {
    let authRedirect;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <button onClick={() => this.login('/game')}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (path) => dispatch(actions.login(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
