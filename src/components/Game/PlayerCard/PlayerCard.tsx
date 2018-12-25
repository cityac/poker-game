import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as css from './PlayerCard.scss';

import Bet from './Bet/Bet';
import User from '../../../models/user';
import Avatar from './Avatar/Avatar';
import { userInfo } from 'os';
import { joinCss } from '../../../utils';
import { clearScreenDown } from 'readline';

export interface PlayerCardProps {
  user: User,
  betY: string,
  userX: string,
}

export default class PlayerCard extends Component<PlayerCardProps> {
  render() {
    const { userX, betY, user: { name, avatar , balance} } = this.props;
    const classesUser = joinCss(css.User, userX === 'left' ? css.FloatLeft : css.FloatRight);
    const betX = userX === 'left' ? 'right' : 'left';
    return (
      <div className={css.PlayerCard}>
        <div className={classesUser}>
          <Avatar url={avatar}/>
          <div className={css.UserInfo}>
            <div>{name}</div>
            <div>{balance}</div>
          </div>
        </div>
        <Bet position={{x: betX, y: betY}} amount='2.0'/>
      </div>
    )
  }
}