import * as React from 'react';
import { Component } from 'react';

import Bet from './Bet/Bet';
import Player, { PlayerStatus } from '~/models/player';
import Avatar from './Avatar/Avatar';
import { joinCss } from '~/utils';

import * as css from './PlayerCard.scss';
import DealerButton from './DealerButton/DealerButton';
import TwoCardsBack from './TwoCards/TwoBacks';
import TwoCardsFront from './TwoCards/TwoFronts';
import ChatCloud from '../Chat/ChatCloud';

export interface PlayerCardProps {
  player: Player;
  betY: string;
  userX: string;
}

export default class PlayerCard extends Component<PlayerCardProps> {
  renderBet() {
    const { userX, betY, player: { status, bet} } = this.props;
    return  (
      status === PlayerStatus.ACTIVE && bet
      ? <Bet position={{x: userX, y: betY}} amount={bet}/>
      : null
    );
  }

  renderDealerButton() {
    const { userX, player: { dealer } } = this.props;
    return (
      dealer
      ? <DealerButton position={{x: userX}} />
      : null
    );
  }

  renderTwoCards() {
    const { userX , player: { currentUser, cards }} = this.props;
    return (
      // TODO: add condition here. More requirements needed
      currentUser
      ? <TwoCardsFront cards={cards} type={'large'} />
      : <TwoCardsBack position={{x: userX}} />
    );

  }

  renderName() {
    const { player: { currentUser, user: {name} } } = this.props;
    return (
      !currentUser
      ? <div>{name}</div>
      : null
    );
  }

  renderAvatar() {
    const {player: { user: { avatar } , currentUser, progress }} = this.props;
    return (
      !currentUser
      ? <Avatar url={avatar} percentage={progress}/>
      : null
    );
  }

  renderUserInfo() {
    const { userX, player: { balance, status} } = this.props;
    const classesUser = joinCss(
      css.User,
      userX === 'left' ? css.FloatLeft : userX === 'center' ? css.FloatCenter : css.FloatRight,
      status !== PlayerStatus.ACTIVE ? css.UserInactive : '');

    let info;
    if (status === PlayerStatus.ACTIVE) {
      info = (
        <React.Fragment>
          {this.renderName()}
          <div className={css.Balance}>{balance}</div>
          {this.renderDealerButton()}
          {this.renderTwoCards()}
        </React.Fragment>
      );
    } else {
      info = (
        <div>{status}</div>
      );
    }
    return (
      <div className={classesUser}>
        {this.renderAvatar()}
        <div className={css.UserInfo}>
          {info}
        </div>
      </div>
    );
  }

  renderChatCloud() {
    const { player } =  this.props;
    return (
      player.currentUser ? <ChatCloud message="Well Played!" className={css.ChatCloud}/> : null 
    )
  }

  render() {

    return (
      this.props.player
      ? <div className={css.PlayerCard}>
        {this.renderChatCloud()}
        {this.renderUserInfo()}
        {this.renderBet()}
      </div>
      : null
    );
  }
}