import * as React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { toCurrency, cn } from '~/utils';
import { jess } from '~/utils/images';

import { selectSpin, selectNextSpin, selectSpinGamesNumber, switchView } from "~/store/actions";

import LobbyCard from '~/components/Lobby/LobbyCard';
import LobbyCardSmall from '~/components/Lobby/LobbyCardSmall/index.tsx';
import Avatar from '~/components/Lobby/LobbyAvatar';
import Stepper from '~/components/Common/Stepper/Stepper';

import Filter from './Filter';
import * as css from './Lobby.scss';

interface LobbyProps {
  spins: [],
  minBuyIn:number,
  maxBuyIn:number,
  selectedSpin: any,
  smallView: boolean,
  onSwitchView(): void,
  onSelectSpin(id: number): void,
  onSelectNextSpin(): void,
  onSelectPrevSpin(): void,
  onSelectGame(spinId, gamesNumber: number): void,
}

interface LobbyState {
  filter: boolean,
}

class Lobby extends Component<LobbyProps, LobbyState>{
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.scrollContainerRef = React.createRef<HTMLDivElement>();
    this.state = {
      filter: false,
    }
  }

  componentDidMount() {
      this.scrollToSelectedSpin();

      const swipeHandler = this.onSwipe.bind(this);
      const touchStartListener = this.onSwipeStart.bind(this);
      const passive = { passive: false };
      this.scrollContainerRef.current.addEventListener('gesture-left', swipeHandler, passive);
      this.scrollContainerRef.current.addEventListener('gesture-right', swipeHandler, passive);
      this.scrollContainerRef.current.addEventListener('touchstart', touchStartListener, passive);
  }

  componentDidUpdate() {
    this.scrollToSelectedSpin();
  }

  scrollToSelectedSpin() {
    
    const { smallView, selectedSpin } = this.props;

    let width = window.innerWidth;
    let spinColumn = selectedSpin.order;
    let orderShift = width / 1.705 * (spinColumn - 1);
    let paddingShift = width / 8.1 * (spinColumn - 1);
    let leftPadding = 9;
    let top = 0;

    if (smallView) {
      if (spinColumn > 5 ) spinColumn = spinColumn % 5;
      if (spinColumn === 0) spinColumn = 5;
      
      orderShift = width / 3.65 * (spinColumn - 2);
      paddingShift = width / 12 * (spinColumn - 1);
      leftPadding = 0;
      top = undefined;
    }
    
    let left = leftPadding + orderShift + paddingShift;
    const behavior = 'smooth';
    this.scrollContainerRef.current.scrollTo({
      top,
      left,
      behavior,
    })
  }

  forceSwipeStop = false;
  onSwipeStart(event) {
    if (this.props.smallView) return;
    event.preventDefault();
  }

  onSwipe = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { onSelectNextSpin, onSelectPrevSpin, smallView } = this.props;
    if (smallView) {
      return;
    }
    switch(event.type) {
      case 'gesture-right':
        onSelectPrevSpin();
        break;
      case 'gesture-left':
        onSelectNextSpin()
        break;
    }
  }

  selectGameNumber(gamesNumber){
    const { onSelectGame, selectedSpin } = this.props;
    onSelectGame(selectedSpin.id, gamesNumber);
  }

  closeFilter = () => {
    this.setState({filter: false});
  }

  showFilter = () => {
    this.setState({filter: true})
  }
  
  selectGames = [1,2,3,4];

  render() {
    const {
      spins,
      minBuyIn,
      maxBuyIn,
      selectedSpin,
      onSelectSpin,
      onSwitchView,
      smallView} = this.props;

    return (
      <div className={css.LobbyWrapper}>
        <div className={cn(css.Lobby, !this.state.filter && css.Lobby_Active)}>
          <div className={css.Header}>
            <Avatar url={jess}/>
            <div className={css.Label}>Spins</div>
            <div className={css.Icons}>
              <div className={css.Icons_Filter} onClick={this.showFilter} />
              <div className={css.Icons_CardsView} onClick={onSwitchView}/>
            </div>
          </div>
          <div className={css.Cards_Container}>
          { !smallView
            ? (<div ref={this.scrollContainerRef}
              className={css.Cards_Container_Scroll}>
                {
                  spins.map((spin:any) => 
                    <LobbyCard 
                      key={spin.id}
                      selected={spin.id === selectedSpin.id}
                      spin={spin}
                      onSelect={onSelectSpin}
                      />)
                }
            </div>)
            : 
            (<div ref={this.scrollContainerRef}
              className={css.Cards_Container_Scroll_Sm}>
              <div className={css.TwoRowsWrapper}>
                {
                  spins.map((spin:any) => 
                    <LobbyCardSmall
                      key={spin.id}
                      selected={spin.id === selectedSpin.id}
                      spin={spin}
                      onSelect={onSelectSpin}
                      />)
                }
                </div>
            </div>)
          }
          </div>

          <div className={cn(css.LobbyComponent)}>
            <div className={css.LobbyLabel}>{toCurrency(minBuyIn)}</div>
            <Stepper
              key={selectedSpin.id}
              styles={{color: '#FF0000'}}
              max={maxBuyIn}
              min={0}
              value={selectedSpin.buyIn} />
              <div className={css.LobbyLabel}>{toCurrency(maxBuyIn)}</div>
          </div>

          <div className={css.LobbyComponent}>
            <div className={cn(css.LobbyLabel, css.SelectGamesLabel)}>select number of games</div>
            <div className={css.ActionButtons}>
              {
                this.selectGames.map(num => (
                  <div key={num} className={cn(css.SelectButton, selectedSpin.gameNumber === num && css.SelectButton_Selected)}
                    onClick={() => this.selectGameNumber(num)}
                  >{num}</div>
                ))
              }
            </div>
          </div>

          <hr/>

          <div className={cn(css.LobbyComponent, css.Summary)}>
            <div className={css.LabelRow}>
              <div className={cn(css.LobbyLabel, css.BuyInLabel)}>Total Buy-in</div>
              <div className={cn(css.LobbyLabel, css.BuyInLabel)}>{toCurrency(40,2, {currency: 'USD', after: true})}</div>
            </div>
            <div className={css.LabelRow}>
              <div className={cn(css.LobbyLabel)}>2 x $10 tickets</div>
              <div className={cn(css.LobbyLabel)}>{toCurrency(20,2, {currency: 'USD', after: true})}</div>
            </div>
          </div>

          <div className={css.LobbyComponent}>
            <NavLink to='/game' style={{width: '100%', paddingTop:'20px'}}>
              <button className={css.ApplyButtons_Apply}>Register</button>
            </NavLink>
          </div>

        </div>
        <Filter className={cn(css.Filter, this.state.filter && css.Filter_Active)} onClose={this.closeFilter}/>
      </div>
    );
  }
}

const mapStateToProps = ({lobby}) => ({
  selectedSpin: lobby.selectedSpin,
  spins: lobby.spins,
  smallView: lobby.smallView,
  minBuyIn: lobby.spins.length && lobby.spins[0].buyIn,
  maxBuyIn: lobby.spins.length && lobby.spins[lobby.spins.length-1].buyIn
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSpin: (id) => dispatch(selectSpin(id)),
    onSelectNextSpin: () => dispatch(selectNextSpin(true)),
    onSelectPrevSpin: () => dispatch(selectNextSpin(false)),
    onSelectGame: (spinId, gameNumber) => dispatch(selectSpinGamesNumber(spinId, gameNumber)),
    onSwitchView: () => dispatch(switchView()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);