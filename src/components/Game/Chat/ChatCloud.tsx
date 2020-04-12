import * as React from 'react';
import * as css from './ChatCloud.scss';
import { cn } from '~/utils';


const ChatCloud = (props) => (
  <div className={cn(props.className, css.Cloud)}>{ props.message }</div>
);

export default ChatCloud;