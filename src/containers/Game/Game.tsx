import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile, isIOS } from 'react-device-detect';

import { switchGameMode, initGame, selectTable } from '~/store/actions';
import { fullScreen, joinCss } from '~/utils';
import PlayerCard from '~/components/Game/PlayerCard/PlayerCard';
import Flop from '~/components/Game/Flop/Flop';
import Player from '~/models/player';

import RoundActions from './RoundActions/RoundActions';
import Footer from './Footer/Footer';

import * as css from './Game.scss';

export interface GameProps {
  backPath: string;
  players: Player[];
  pot: number;
  initialized: boolean;
  standalone: boolean;
  history?: any;
  match?: any,
  onSwitchGameMode?(on: boolean): void;
  onInitGame?(): void;
  onSelectTable?(tableId: number): void;
}

// function getViewportWidth() {
//   if (window.innerWidth) {
//       return window.innerWidth;
//   }
//   else if (document.body && document.body.offsetWidth) {
//       return document.body.offsetWidth;
//   }
//   else {
//       return 0;
//   }
// }

// function getViewportHeight() {
//   if (window.innerHeight) {
//       return window.innerHeight;
//   }
//   else if (document.body && document.body.offsetHeight) {
//       return document.body.offsetHeight;
//   }
//   else {
//       return 0;
//   }
// }

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
    return this.props.players.find(player => player.place === place);
  }

  render() {
    const { pot, standalone } = this.props;
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
          <div className={joinCss(css.Item, css.Item__Player10)}>
            <PlayerCard
              userX="left"
              betY="bottom"
              player={playerByPlace(10)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player1)}>
            <PlayerCard
              userX="center"
              betY="bottom"
              player={playerByPlace(1)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player2)}>
            <PlayerCard
              userX="right"
              betY="bottom"
              player={playerByPlace(2)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player9)}>
            <PlayerCard
              userX="left"
              betY="center"
              player={playerByPlace(9)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Flop)}>
            <Flop label={`Pot: ${pot}`}/>
            {/* <SvgFlop /> */}
          </div>
          <div className={joinCss(css.Item, css.Item__Player3)}>
            <PlayerCard
              userX="right"
              betY="center"
              player={playerByPlace(3)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player8)}>
            <PlayerCard
              userX="left"
              betY="center"
              player={playerByPlace(8)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player4)}>
            <PlayerCard
              userX="right"
              betY="center"
              player={playerByPlace(4)}/>
            </div>
          <div className={joinCss(css.Item, css.Item__Player7)}>
            <PlayerCard
              userX="left"
              betY="top"
              player={playerByPlace(7)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player6)}>
            <PlayerCard
                userX="center"
                betY="top"
                player={playerByPlace(6)}/>
          </div>
          <div className={joinCss(css.Item, css.Item__Player5)}>
            <PlayerCard
              userX="right"
              betY="top"
              player={playerByPlace(5)}/>
          </div>
          {/* <div className={joinCss(css.Item, css.Item__Next)}>Next level in 4:00pm</div> */}
          <div className={joinCss(css.Item, css.Item__RoundActions)}>
            <RoundActions />
          </div>
          
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    fullScreen(false);
    this.props.onSwitchGameMode(false);
  }
}

const mapStateToProps = ({ app, game, table, player }) : GameProps => {
  return {
    backPath: game.backPath,
    pot: table.pot,
    players: table.players || [],
    initialized: player.tables && player.tables.length,
    standalone: app.standalone,
  };
};

const mapDispatchToProps = dispatch => ({
  onSwitchGameMode: (on: boolean): void => dispatch(switchGameMode(on)),
  onInitGame: () => dispatch(initGame()),
  onSelectTable: (tableId) => dispatch(selectTable(tableId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
