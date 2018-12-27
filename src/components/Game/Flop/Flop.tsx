import * as React from 'react';
import Card from './Card/Card';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';

const Flop = () => (
  <div className={joinCss(css.Flop, isMobile ? css.Flop_Mobile: css.Flop_Browser)}>
    <div>
      <Card name="diamond_jack"/>
      <Card name="club_jack"/>
       <Card name="spade_jack"/>
      <Card name="diamond_10"/>
      <Card name="club_9"/>
    </div> 
  </div>
)

export default Flop;

