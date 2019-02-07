import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile, isIOS } from 'react-device-detect';

import { switchGameMode, initGame, selectTable, switchChatMode } from '~/store/actions';
import { fullScreen, joinCss, playerByPlace as getPlayer } from '~/utils';
import PlayerCard from '~/components/Game/PlayerCard/PlayerCard';
import Flop from '~/components/Game/Flop/Flop';
import Player from '~/models/player';
import Card from '~/models/card';

import RoundActions from './RoundActions/RoundActions';
import Footer from './Footer/Footer';

import * as css from './Game3.scss';
import Chat from '../../components/Game/Chat/Chat';
import Prizepool from '../../components/Game/Prizepool/Prizepool';
import { loadavg } from 'os';
import Loader from '../../components/Loader/Loader';

export interface GameProps {
  backPath: string;
  players: Player[];
  pot: number;
  initialized: boolean;
  standalone: boolean;
  flopCards: Card[],
  showChat: boolean,
  loading: boolean,
  history?: any;
  match?: any,
  onSwitchGameMode?(on: boolean): void;
  onInitGame?(): void;
  onSelectTable?(tableId: number): void;
  onCloseChat?():void;
}

class Game extends Component<GameProps> {

  componentWillMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack
    // need to find better solution
    if (this.props.backPath && this.props.history.action !== 'POP') {
      fullScreen(true);
    }

    this.props.onSwitchGameMode(true);
  }

  componentDidMount() {
    const { 
      initialized, 
      match: {params: {tableId}}, 
      onInitGame,
      onSelectTable,
    } = this.props;
    if (!initialized) {
      onInitGame();
    } else {
      if (tableId) {
        onSelectTable(Number(tableId));
      }
    }
  }

  playerByPlace = place => {
    return getPlayer(this.props.players, place);
  }

  render() {
    const { pot, standalone, flopCards, showChat, onCloseChat, loading } = this.props;
    const { playerByPlace } = this;

    const isIPoneWeb = isIOS && !standalone;

    const boardClasses = joinCss(
      css.Board, 
      isMobile ? css.Board_Mobile : css.Board_Browser, 
      isIPoneWeb ? css.Board_IPhoneWeb  : ''
    );
    
    return (
      <div className={css.Game}>
        <div className={boardClasses} >
          <div className={joinCss(css.Item, css.Item__Footer)}>
              <Footer backPath={this.props.backPath} />
          </div>
          { !loading ? <React.Fragment>
            <div className={joinCss(css.Item, css.Item__Player1)}>
              <PlayerCard
                userX="left"
                betY="top"
                player={playerByPlace(1)}/>
            </div>
            <div className={joinCss(css.Item, css.Item__Rate)}>Rate: 100 / 200</div>
            <div className={joinCss(css.Item, css.Item__Player2)}>
              <PlayerCard
                userX="right"
                betY="top"
                player={playerByPlace(2)}/>
            </div>

            <div className={joinCss(css.Item, css.Item__Flop)}>
              <Prizepool />
              {/* <Flop label={`Pot: ${pot}`} flopCards={flopCards}/> */}
              {/* <SvgFlop /> */}
            </div>
          
            <div className={joinCss(css.Item, css.Item__Player3)}>
              <PlayerCard
                userX="center"
                betY="top"
                player={playerByPlace(3)}/>
            </div>
          </React.Fragment>
          : <Loader />  }
          
          {/* <div className={joinCss(css.Item, css.Item__Next)}>Next level in 4:00pm</div> */}
          <div className={joinCss(css.Item, css.Item__RoundActions)}>
            { !showChat ? <RoundActions /> : null }
          </div>
        </div>
        
        { showChat 
          ? <Chat hide={onCloseChat} 
              className={joinCss(css.Chat, isIOS ? css.Chat_iPhone : '', isIPoneWeb ? css.Chat_iPhone_Web : '')}/> 
          : null}
      </div>
    );
  }

  componentWillUnmount() {
    // fullScreen(false);
    this.props.onSwitchGameMode(false);
  }
}

const mapStateToProps = ({ app, game, table, player }) : GameProps => {
  return {
    loading: table.loading,
    backPath: game.backPath,
    pot: table.pot,
    players: table.players || [],
    flopCards: table.flopCards,
    initialized: player.tables && player.tables.length,
    standalone: app.standalone,
    showChat: game.chat,
  };
};

const mapDispatchToProps = dispatch => ({
  onSwitchGameMode: (on: boolean): void => dispatch(switchGameMode(on)),
  onInitGame: () => dispatch(initGame()),
  onSelectTable: (tableId) => dispatch(selectTable(tableId)),
  onCloseChat: () => dispatch(switchChatMode(false)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
