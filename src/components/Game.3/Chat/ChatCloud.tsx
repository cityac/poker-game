import * as React from 'react';
import * as css from './ChatCloud.scss';
import { joinCss } from '~/utils';


const ChatCloud = (props) => (
  <div className={joinCss(props.className, css.Cloud)}>{ props.message }</div>
);

export default ChatCloud;