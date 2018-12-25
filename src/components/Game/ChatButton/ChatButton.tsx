import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as css from './ChatButton.scss'

const ChatButton = () => (
    <NavLink className={css.ChatButton} to='/real-money'></NavLink>
);

export default ChatButton;
