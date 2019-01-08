import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect'

import { switchGameMode } from '~/store/actions';
import { fullScreen, joinCss } from '~/utils';
import PlayerCard from '~/components/Game/PlayerCard/PlayerCard';
import Flop from '~/components/Game/Flop/Flop';
import Player from '~/models/player';
import Table from '~/models/table';

import RoundActions from './RoundActions/RoundActions';
import Footer from './Footer/Footer';

import * as css from './Game.scss';

export interface GameProps {
  message: string,
  backPath: string,
  table: Table,
  players: Array<Player>,
  switchGameModeDispatch?(on: boolean): void,
  history?: any;
}

class Game extends Component<GameProps> {

  componentWillMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack 
    // need to find better solution
    if(this.props.backPath && this.props.history.action !== 'POP') {
      fullScreen(true);
    }

    this.props.switchGameModeDispatch(true);
  }

  playerByPlace = place => {
    return this.props.players.find(player => player.place === place);
  }

  render() {
    // const isMobile = true;
    const { players } = this.props;
    const { playerByPlace } = this;
    return (
      <div className={css.Game}>
        <div className={joinCss(css.Board, isMobile ? css.Board_Mobile : css.Board_Browser)} >
          <div className={joinCss(css.Item, css.Item__Player10)}>
            <PlayerCard 
              userX='left' 
              betY='bottom' 
              player={playerByPlace(10)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player1)}>
            <PlayerCard 
              userX='center'
              betY='bottom' 
              player={playerByPlace(1)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player2)}>
            <PlayerCard 
              userX='right'
              betY='bottom' 
              player={playerByPlace(2)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player9)}>
            <PlayerCard 
              userX='left' 
              betY='center' 
              player={players[8]}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Flop)}>
            <Flop label="Pot: 20.2"/>
            {/* <SvgFlop /> */}
          </div>
          <div className={joinCss(css.Item, css.Item__Player3)}>
            <PlayerCard 
              userX='right' 
              betY='center' 
              player={playerByPlace(3)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player8)}>
            <PlayerCard 
              userX='left'  
              betY='center' 
              player={playerByPlace(8)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player4)}>
            <PlayerCard 
              userX='right'  
              betY='center' 
              player={playerByPlace(4)}/>
            </div>
          <div className={joinCss(css.Item, css.Item__Player7)}>
            <PlayerCard 
              userX='left' 
              betY='top' 
              player={playerByPlace(7)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player6)}>
            <PlayerCard 
                userX='center' 
                betY='top' 
                player={players[5]}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player5)}>
            <PlayerCard 
              userX='right' 
              betY='top' 
              player={playerByPlace(5)}/>
          </div>
          {/* <div className={joinCss(css.Item, css.Item__Next)}>Next level in 4:00pm</div> */}
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

const mapStateToProps = ({ game }) : GameProps => {
  const table = game.tables.find(table => table.id === game.currentTableId);
  const players = table && table.players || [];
  return {
    message: game.message,
    backPath: game.backPath,
    table,
    players,
  }
};

const mapDispatchToProps = dispatch => ({
  switchGameModeDispatch: (on: boolean): void => dispatch(switchGameMode(on)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Game)
