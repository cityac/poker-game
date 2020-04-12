import * as React from 'react';

import { cn } from '~/utils';

import * as css from './ActionButton.scss';
import * as commonCss from '../Common.scss';

interface ActionButtonProps {
  labels: string[];
  className?: string;
  onClick: Function;
}

const ActionButton = (props: ActionButtonProps) => (
  <button className={cn(commonCss.Button, css.Button, props.className)} onClick={() => props.onClick()}>
    {props.labels.map(el => <div className={css.Button_LabelWrap} key={el}>{el}</div>)}
  </button>
);

export default ActionButton;