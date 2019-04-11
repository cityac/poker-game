import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { cn } from '~/utils';

import * as css from './LobbyCard.scss';

interface LobbyCardProps extends React.Attributes {
  spin: any,
  color: string;
  selected?: boolean;
  onSelect: Function;
}
class LobbyCardSmall extends Component<LobbyCardProps> {

  view: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  getClassNames() {
    const { spin: { color }, selected} = this.props;

    let classnames;
    switch (color) {
      case 'blue':
        classnames = css.LobbyCardBlue;
        break;
      case 'green':
        classnames = css.LobbyCardGreen;
        break;
      case 'yellow':
        classnames = css.LobbyCardYellow;
      break;
      case 'red': 
        classnames = css.LobbyCardRed;
        break;
      default: 
        classnames = css.LobbyCardBlue;
    }

    if (selected) {
      return cn(classnames, css.LobbyCard_Selected)
    }

    return classnames;
  }


  scroll() {
    // this.view.current.scrollIntoView({block: "end", behavior: "smooth"});
  }
  render() {

    const { onSelect, spin: {id, buyIn, prize, ticketsLeft, game}, selected } = this.props;
    let classnames = this.getClassNames();
    
    return (
      <div ref={this.view} 
        className={cn(css.LobbyCard, classnames)} onClick={() => { onSelect(id); this.scroll()}}>
        <div className={cn(css.BuyIn, selected && css.BuyInSelected)}>Buy-in {buyIn}</div>
        <div className={cn(css.WinLabel, selected && css.WinLabelSelected)}>WIN UP TO</div>
        <div className={cn(css.Prize, selected && css.PrizeSelected)}>{prize}</div>
        <div className={cn(css.Game, selected && css.GameSelected)}>{game}</div>
        <div className={cn(css.Tickets, selected && css.TicketsSelected)}>{ticketsLeft}</div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(LobbyCardSmall);

