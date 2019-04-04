import React from 'react';
import { isIOS } from 'react-device-detect';

import { joinCss } from '~/utils';

import NavigationItems from '../NavigationItems/NavigationItems';

import css from './Toolbar.scss';

const toolbar = (props) => {

  const isIPoneWeb = isIOS && !props.standalone;

  return (
    <header className={joinCss(css.Toolbar, isIOS && css.Toolbar_iPhone, isIPoneWeb && css.Toolbar_iPhone_Web)}>
      <hr/>
      <nav className={css.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  )
}

export default toolbar;
