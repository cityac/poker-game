import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {props.isAuthenticated ? (
      <NavigationItem link="/real-money" exact>
        Real Money
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/fast-forward" exact>
        Fast Forward
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/tournaments" exact>
        Tournaments
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/sit-and-go" exact>
        Sit and Go
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/my-tournaments" exact>
        My Tournaments
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/casino" exact>
        Casino
      </NavigationItem>
    ) : null}
    {props.isAuthenticated ? <NavigationItem link="/game">Game</NavigationItem> : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
