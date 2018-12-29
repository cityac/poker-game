import * as React from 'react';
import Card from './Card/Card';

import { isMobile } from 'react-device-detect';
import { joinCss } from '~/utils';

import * as css from './Flop.scss';
import SvgFlop from '../SvgFlop/SvgFlop';

const Flop = (props) => (
  <div className={joinCss(css.Flop, isMobile ? css.Flop_Mobile: css.Flop_Browser)}>
    <div className={css.Flop_Label}>{props.label}</div>
    <SvgFlop />
  </div>

)

export default Flop;

