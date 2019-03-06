import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as css from './Auth.css';

import { Redirect } from 'react-router-dom';

import { joinCss } from '~/utils';

import * as actions from '~/store/actions/index';

export interface AuthProps {
  onLogin(path: string, tablePath: number): void;
  onSetGameBackPath(path: string): void;
  isAuthenticated: boolean;
  authRedirectPath: string;
}

class Auth extends Component<AuthProps> {
  login = (path, tableType) => {
    const { onLogin, onSetGameBackPath } = this.props;
    onLogin(`${path}${tableType}`, tableType);
    onSetGameBackPath('/welcome');
  };

  render() {
    let authRedirect;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    const types = [1, 2, 3, 4, 5, 6];

    return (
      <div>
        {authRedirect}
        {/* <div className={css.Auth}>
          <button onClick={() => this.login('/game5')}>Login</button>
        </div> */}
        <div className={css.TableTypeWrapper}>
        {types.map(type => 
          <button key={type} className={css.TableTypeLink} onClick={() => this.login('game', type)} >
            <div className={joinCss(css.TableType, css[`tableType_${type}`])} />
          </button>)}
        </div>
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
    onLogin: (path, type) => dispatch(actions.login(path, type)),
    onSetGameBackPath: path => dispatch(actions.setGameBackPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
