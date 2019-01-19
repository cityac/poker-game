import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as css from './Chat.scss';

export default class Chat extends Component {
  render() {
    return (
      <div className={css.Chat}>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game">Table 1</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game">Table 2</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game">Table 3</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game">Table 4</NavLink>
        </div>
      </div>
    )
  }
}