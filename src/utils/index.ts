import { joinCss } from './cssUtils';
import { fullScreen } from './fullscreenUtils';
import { isString, toCurrency } from './object';
import { playerByPlace } from './player';

import * as smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

export {
  joinCss,
  fullScreen,
  isString,
  playerByPlace,
  toCurrency,
}