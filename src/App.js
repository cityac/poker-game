import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.scss';
import './utils/object.js';
import './utils/images.ts';

import * as TouchHandler from './utils/touchHandler';

import * as actions from './store/actions';
import Layout from './hoc/Layout/Layout';

import Game from './containers/Game/Game';
import Welcome from './containers/Welcome/Welcome';
import Dashboard from './containers/Dashboard/Dashboard';
import Lobby from './containers/Lobby/Lobby';

import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

class App extends Component {
  getSnapshotBeforeUpdate() {
    const { onSetGameBackPath, location } = this.props;

    if (!location.pathname.match(/^\/[game|auth|dashboard]/) ) {
      onSetGameBackPath(location.pathname);
    }
    window.previousLocation = location;

    return null;
  }

  componentDidMount() {
    TouchHandler.run();
    this.checkStandalone();
  }

  checkStandalone() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.props.onSetStandalone();
    }
  }
  
  // required for getSnapshotBeforeUpdate() method
  componentDidUpdate() {
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/cashback" component={Welcome} />
          <Route path="/offers" component={Welcome} />
          <Route path="/deposit" component={Welcome} />
          <Route path="/home" component={Welcome} />
          <Route path="/game/:tableId?" component={Game} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/lobby" component={Lobby} />
          <Route path="/" exact component={Welcome} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGameBackPath: path => dispatch(actions.setGameBackPath(path)),
    onSetStandalone: () => dispatch(actions.setStandalone()),

  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
