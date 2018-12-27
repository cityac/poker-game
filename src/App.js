import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.scss';

import * as actions from './store/actions';
import Layout from './hoc/Layout/Layout';

import Game from './containers/Game/Game';
import Welcome from './containers/Welcome/Welcome';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';

import './utils/avatar';

class App extends Component {
  componentDidUpdate() {

  }

  getSnapshotBeforeUpdate() {
    const { onSetGameBackPath, location } = this.props;

    if (!location.pathname.match(/^\/[game | path]/) ) {
      onSetGameBackPath(location.pathname);
    }
    window.previousLocation = location;

    return null;
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
          <Route path="/game" exact component={Game} />
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
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
