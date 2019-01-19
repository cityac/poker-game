import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { fullScreen } from '~/utils';
import { switchGameMode } from '~/store/actions';

import * as css from './Chat.scss';

interface ChatProps {
  onSwitchGameMode(on: boolean): void;
}

class Chat extends Component<ChatProps> {
  componentDidMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack
    // need to find better solution
    fullScreen(true);

    this.props.onSwitchGameMode(true);
  } 
  render() {
    return (
      <div className={css.Chat}>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game/1">Table 1</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game/2">Table 2</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game/3">Table 3</NavLink>
        </div>
        <div className={css.Chat_TableItem}>
          <NavLink className={css.Chat_TableItem_Label} to="/game">Table 4</NavLink>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSwitchGameMode: (on: boolean): void => dispatch(switchGameMode(on)),
});
export default connect(null, mapDispatchToProps)(Chat);