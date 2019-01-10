import * as React from 'react';

import { joinCss } from '~/utils';

import * as css from './ActionButton.scss';
import * as commonCss from '../Common.scss';

interface ActionButtonProps {
  labels: Array<string>
  className?: string,
  onClick: Function,
}

const ActionButton = (props: ActionButtonProps) => (
  <button className={joinCss(commonCss.Button, css.Button, props.className)} onClick={() => props.onClick()}>
    {props.labels.map(el => <div className={css.Button_LabelWrap} key={el}>{el}</div>)}
  </button>
)

export default ActionButton;