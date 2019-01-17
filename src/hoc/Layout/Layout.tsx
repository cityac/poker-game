import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import * as classes from './Layout.scss';
import Toolbar from '~/components/Navigation/Toolbar/Toolbar';
import SideDrawer from '~/components/Navigation/SideDrawer/SideDrawer';

interface LayoutProps {
  isAuthenticated: boolean,
  showToolbar: boolean,
}

interface LayoutState {
  showSideDrawer: boolean,
}

class Layout extends Component<LayoutProps, LayoutState> {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    const { showToolbar, isAuthenticated, children } = this.props;
    const mainClasses = [classes.Content];
    
    mainClasses.push(showToolbar ? classes.Margin : classes.NoMargin);

    return (
      <div >
        {showToolbar ? <Toolbar isAuth={isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/> : null}
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={mainClasses.join(' ')}>{children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    showToolbar: !state.app.game,
  };
};

export default connect(mapStateToProps)(Layout);
