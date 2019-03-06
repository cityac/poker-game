import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.scss';
import './utils/object.js';
import './utils/avatar';

import * as TouchHandler from '~/utils/touchHandler';

import * as actions from './store/actions';
import Layout from './hoc/Layout/Layout';

import Game from './containers/Game/Game';
import Game1 from './containers/Game.1/Game';
import Game2 from './containers/Game.2/Game';
import Game3 from './containers/Game.3/Game';
import Game4 from './containers/Game.4/Game';
import Game5 from './containers/Game.5/Game';
import Game6 from './containers/Game.6/Game';
import Welcome from './containers/Welcome/Welcome';
import Dashboard from './containers/Dashboard/Dashboard';

import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

class App extends Component {
  getSnapshotBeforeUpdate() {
    const { onSetGameBackPath, location } = this.props;

    if (!location.pathname.match(/^\/[game | path]/) ) {
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
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/real-money" component={Welcome} />
          <Route path="/fast-forward" component={Welcome} />
          <Route path="/sit-and-go" component={Welcome} />
          <Route path="/tournaments" component={Welcome} />
          <Route path="/my-tournaments" component={Welcome} />
          <Route path="/casino" component={Welcome} />
          <Route path="/game/:tableId?" component={Game} />
          <Route path="/game1/:tableId?" component={Game1} />
          <Route path="/game2/:tableId?" component={Game2} />
          <Route path="/game3/:tableId?" component={Game3} />
          <Route path="/game4/:tableId?" component={Game4} />
          <Route path="/game5/:tableId?" component={Game5} />
          <Route path="/game6/:tableId?" component={Game6} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/logout" component={Logout} />
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
