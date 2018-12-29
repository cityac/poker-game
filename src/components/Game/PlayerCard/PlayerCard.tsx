import * as React from 'react';
import { Component } from 'react';

import Bet from './Bet/Bet';
import User, { GamerStatus } from '~/models/user';
import Avatar from './Avatar/Avatar';
import { joinCss } from '~/utils';

import * as css from './PlayerCard.scss';
import DealerButton from './DealerButton/DealerButton';
import TwoBacks from './TwoCards/TwoBacks';
import TwoFronts from './TwoCards/TwoFronts';

export interface PlayerCardProps {
  user: User,
  betY: string,
  userX: string,
}

export default class PlayerCard extends Component<PlayerCardProps> {
  renderBet() {
    const { userX, betY, user: { status, bet} } = this.props;
    return  (
      status === GamerStatus.ACTIVE && bet
      ? <Bet position={{x: userX, y: betY}} amount={bet}/>
      : null
    );
  }

  renderDealerButton() {
    const { userX, user: { dealer } } = this.props;
    return (
      dealer
      ? <DealerButton position={{x: userX}} />
      : null
    );
  }

  renderTwoBacksCards() {
    const { userX , user: { currentUser }} = this.props;
    return (
      // TODO: add condition here. More requirements needed
      currentUser 
      ? <TwoFronts />
      : <TwoBacks position={{x: userX}} />
    );
    
  }

  renderName() {
    const {user: { name, currentUser }} = this.props;
    return (
      !currentUser
      ? <div>{name}</div>
      : null
    );
  }

  renderUserInfo() {
    const { userX, user: { avatar , balance, status} } = this.props;
    const classesUser = joinCss(
      css.User, 
      userX === 'left' ? css.FloatLeft : userX === 'center' ? css.FloatCenter : css.FloatRight,
      status !== GamerStatus.ACTIVE ? css.UserInactive : '');
    
    let info;
    if (status === GamerStatus.ACTIVE) {
      info = (
        <React.Fragment>
          {this.renderName()}
          <div className={css.Balance}>{balance}</div>
          {this.renderDealerButton()}
          {this.renderTwoBacksCards()}
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