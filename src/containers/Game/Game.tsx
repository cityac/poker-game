import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { switchGameMode } from '../../store/actions';
import { toggleFullScreen, joinCss } from '../../utils';

import * as css from './Game.scss';
import PlayerCard from '../../components/Game/PlayerCard/PlayerCard';

import ChatButton from '../../components/Game/ChatButton/ChatButton';
import BackButton from '../../components/Game/BackButton/BackButton';

export interface GameProps {
  message: string;
  switchGameModeDispatch?(on: boolean): void,
}

@connect(
  ({ game }) : GameProps => ({
    message: game.message,
  }),
  dispatch => ({
    switchGameModeDispatch: (on: boolean): void => dispatch(switchGameMode(on)),
  }),
)
export default class Game extends Component<GameProps> {

  componentDidMount() {
    toggleFullScreen(true);
    this.props.switchGameModeDispatch(true);
  }

  render() {
    return (
      <div className={css.Game}>
        <div className={css.Board}>
          <div className={joinCss(css.Item, css.Item__Player1)}>
            <PlayerCard 
              userX='left'
              betY='bottom' 
              user={{
                name: 'Stanislav', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 98.2}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Next)}>Next level in 4:00pm</div>
          <div className={joinCss(css.Item, css.Item__Player2)}>
            <PlayerCard 
              userX='right'
              betY='bottom' 
              user={{
                name: 'Sergei', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 48.2}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player3)}>
            <PlayerCard 
              userX='left' 
              betY='center' 
              user={{
                name: 'Igor', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 100.8}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Flop)}>FLOP:</div>
          <div className={joinCss(css.Item, css.Item__Player4)}>
            <PlayerCard 
              userX='right' 
              betY='center' 
              user={{
                name: 'Vitalii', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 94.8}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player5)}>
            <PlayerCard 
              userX='left'  
              betY='center' 
              user={{
                name: 'Konstantin', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 66.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player6)}>
            <PlayerCard 
              userX='right'  
              betY='center' 
              user={{
                name: 'Dmitrii', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 66.6}}/>
            </div>
          <div className={joinCss(css.Item, css.Item__Player7)}>
            <PlayerCard 
              userX='left' 
              betY='top' 
              user={{
                name: 'Viktor', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 44.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player__me)}>Me:</div>
          <div className={joinCss(css.Item, css.Item__Player8)}>
            <PlayerCard 
              userX='right' 
              betY='top' 
              user={{
                name: 'Mustafa', 
                avatar: '/static/media/Stan.1523e137.png',
                balance: 24.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Fold)}>FOLD:</div>
          <div className={joinCss(css.Item, css.Item__Footer)}>
              <BackButton />
              <ChatButton />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    toggleFullScreen();
    this.props.switchGameModeDispatch(false);
  }
}
