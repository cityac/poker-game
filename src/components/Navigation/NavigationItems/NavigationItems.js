import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const renderAuthenticated = () => (
  <React.Fragment>
    <NavigationItem link="/real-money" exact>Real Money</NavigationItem>
    <NavigationItem link="/fast-forward" exact>Fast Forward</NavigationItem>
    <NavigationItem link="/tournaments" exact>Tournaments</NavigationItem>
    <NavigationItem link="/sit-and-go" exact>Sit and Go</NavigationItem>
    <NavigationItem link="/my-tournaments" exact>My Tournaments</NavigationItem>
    <NavigationItem link="/casino" exact>Casino</NavigationItem>
    <NavigationItem link="/chat" exact>Chat</NavigationItem>
    <NavigationItem link="/game" exact>Game</NavigationItem>
    <NavigationItem link="/logout">Logout</NavigationItem>
  </React.Fragment>
  );

const renderShared = () => (
  <NavigationItem link="/auth">Authenticate</NavigationItem>
)

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {
      props.isAuthenticated ? renderAuthenticated() : renderShared()
    }
  </ul>
);

export default navigationItems;
