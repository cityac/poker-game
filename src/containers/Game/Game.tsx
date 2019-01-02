import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { isMobile } from 'react-device-detect'

import { switchGameMode } from '~/store/actions';
import { fullScreen, joinCss } from '~/utils';
import { GamerStatus } from '~/models/user';
import PlayerCard from '~/components/Game/PlayerCard/PlayerCard';
import Footer from './Footer/Footer';

import * as css from './Game.scss';
import Card from '../../components/Game/Flop/Card/Card';
import Flop from '../../components/Game/Flop/Flop';
import SvgFlop from '../../components/Game/SvgFlop/SvgFlop';
import RoundActions from './RoundActions/RoundActions';

export interface GameProps {
  message: string,
  backPath: string,
  switchGameModeDispatch?(on: boolean): void,
  history?: any;
}

@connect(
  ({ game }) : GameProps => ({
    message: game.message,
    backPath: game.backPath,
  }),
  dispatch => ({
    switchGameModeDispatch: (on: boolean): void => dispatch(switchGameMode(on)),
  }),
)
export default class Game extends Component<GameProps> {

  componentWillMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack 
    // need to find better solution
    if(this.props.backPath && this.props.history.action !== 'POP') {
      fullScreen(true);
    }

    this.props.switchGameModeDispatch(true);
  }

  render() {
    // const isMobile = true;
    return (
      <div className={css.Game}>
        <div className={joinCss(css.Board, isMobile ? css.Board_Mobile : css.Board_Browser)} >
          <div className={joinCss(css.Item, css.Item__Player1)}>
            <PlayerCard 
              userX='left'
              betY='bottom' 
              user={{
                name: 'Stanislav', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.ACTIVE,
                bet: '2.0',
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
                status: GamerStatus.ACTIVE,
                dealer: true,
                bet: '2.0',
                balance: 48.2}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player3)}>
            <PlayerCard 
              userX='left' 
              betY='center' 
              user={{
                name: 'Igor', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.ACTIVE,
                balance: 100.8}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Flop)}>
            <Flop label="Pot: 20.2"/>
            {/* <SvgFlop /> */}
          </div>
          <div className={joinCss(css.Item, css.Item__Player4)}>
            <PlayerCard 
              userX='right' 
              betY='center' 
              user={{
                name: 'Vitalii', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.FOLD,
                bet: '2.0',
                balance: 94.8}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player5)}>
            <PlayerCard 
              userX='left'  
              betY='center' 
              user={{
                name: 'Konstantin', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.AWAY,
                bet: '2.0',
                balance: 66.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player6)}>
            <PlayerCard 
              userX='right'  
              betY='center' 
              user={{
                name: 'Dmitrii', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.ACTIVE,
                bet: '2.0',
                balance: 66.6}}/>
            </div>
          <div className={joinCss(css.Item, css.Item__Player7)}>
            <PlayerCard 
              userX='left' 
              betY='top' 
              user={{
                name: 'Viktor', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.ACTIVE,
                balance: 44.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player__me)}>
            <PlayerCard 
                userX='center' 
                betY='top' 
                user={{
                  currentUser: true,
                  name: 'Stan current user', 
                  // avatar: '/static/media/Stan.1523e137.png',
                  status: GamerStatus.ACTIVE,
                  bet: '2.0',
                  balance: 120.2}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player8)}>
            <PlayerCard 
              userX='right' 
              betY='top' 
              user={{
                name: 'Mustafa', 
                avatar: '/static/media/Stan.1523e137.png',
                status: GamerStatus.ACTIVE,
                bet: '2.0',
                balance: 24.6}}/>
          </div>
          <div className={joinCss(css.Item, css.Item__RoundActions)}>
            <RoundActions/>
          </div>
          <div className={joinCss(css.Item, css.Item__Footer)}>
              <Footer backPath={this.props.backPath} />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    fullScreen(false);
    this.props.switchGameModeDispatch(false);
  }
}
