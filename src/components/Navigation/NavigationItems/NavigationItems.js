import React from 'react';

import * as css from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

import { withRouter } from 'react-router-dom';

import { joinCss } from '~/utils';

// import {
//   home_src,
//   home_src_2x,
//   deposit_src,
//   deposit_src_2x,
//   offers_src,
//   offers_src_2x,
//   more_src,
//   more_src_2x,
//   cashback_src,
//   cashback_src_2x} from '~/utils/images'

const renderAuthenticated = (path) => (
  <React.Fragment>
    <NavigationItem link="/lobby" exact className={joinCss(css.Home, path === '/lobby' && css.Home_Active)}>
      <label>home</label>
    </NavigationItem>

    <NavigationItem link="/cashback" exact className={joinCss(css.Cashback, path === '/cashback' && css.Cashback_Active)}>
      <label>cashback</label>
    </NavigationItem>

    <NavigationItem link="/deposit" exact className={joinCss(css.Deposit, path === '/deposit' && css.Deposit_Active)}>
      <label>deposit</label>
    </NavigationItem>

    <NavigationItem link="/offers" exact className={joinCss(css.Offers, path === '/offers' && css.Offers_Active)}>
      <label>offers</label>
    </NavigationItem>

    <NavigationItem link="/more" exact className={joinCss(css.More, path === '/more' && css.More_Active)}>
      <label>more</label>
    </NavigationItem>
  </React.Fragment>
  );

const renderShared = () => (
  <NavigationItem link="/auth">Authenticate</NavigationItem>
)

const navigationItems = (props) => (
  <ul className={css.NavigationItems}>
    {
      props.isAuthenticated ? renderAuthenticated(props.location.pathname) : renderShared()
    }
  </ul>
);


export default withRouter(navigationItems);
