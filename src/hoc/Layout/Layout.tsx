import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import * as classes from './Layout.scss';
import Toolbar from '~/components/Navigation/Toolbar/Toolbar';

interface LayoutProps {
  isAuthenticated: boolean,
  showToolbar: boolean,
  standalone: boolean,
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
    const { showToolbar, isAuthenticated, children, standalone } = this.props;
    const mainClasses = [classes.Content];
    
    mainClasses.push(showToolbar ? classes.Margin : classes.NoMargin);

    return (
      <div >
        {/* {showToolbar ? <Toolbar isAuth={isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/> : null} */}
        
        <main className={mainClasses.join(' ')}>{children}</main>
        { showToolbar ? <Toolbar isAuth={isAuthenticated} standalone={standalone} /> : null }
      </div>
    );
  }
}

const mapStateToProps = ({app, auth}) => {
  return {
    standalone: app.standalone,
    isAuthenticated: auth.token !== null,
    showToolbar: !app.game,
  };
};

export default connect(mapStateToProps)(Layout);
