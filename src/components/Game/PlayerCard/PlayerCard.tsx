import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as css from './PlayerCard.scss';

import Bet from './Bet/Bet';
import User, { GamerStatus } from '~/models/user';
import Avatar from './Avatar/Avatar';
import { joinCss } from '~/utils';

export interface PlayerCardProps {
  user: User,
  betY: string,
  userX: string,
}

export default class PlayerCard extends Component<PlayerCardProps> {
  renderBet() {
    const { userX, betY, user: { status, bet} } = this.props;
    const betX = userX === 'left' ? 'right' : 'left';
    return  (
      status === GamerStatus.ACTIVE && bet
      ? <Bet position={{x: betX, y: betY}} amount={bet}/>
      : null
    );
  }

  renderUserInfo() {
    const { userX, user: { name, avatar , balance, status} } = this.props;
    const classesUser = joinCss(
      css.User, 
      userX === 'left' ? css.FloatLeft : css.FloatRight,
      status !== GamerStatus.ACTIVE ? css.UserInactive : '');
    
    let info;
    if (status === GamerStatus.ACTIVE) {
      info = (
        <React.Fragment>
          <div>{name}</div>
          <div>{balance}</div>
        </React.Fragment>
      )
    } else {
      info = (
        <div>{status}</div>
      )
    }
    return (
      <div className={classesUser}>
        <Avatar url={avatar}/>
        <div className={css.UserInfo}>
          {info}
        </div>
      </div>
    )
  }

  render() {
    
    return (
      <div className={css.PlayerCard}>
        {this.renderUserInfo()}
        {this.renderBet()}
      </div>
    )
  }
}