import * as React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

import { joinCss, toCurrency } from '~/utils';

import * as css from './LobbyCard.scss';

interface LobbyCardProps extends React.Attributes {
  spin: any,
  color: string;
  selected?: boolean;
  onSelect: Function;
}

class LobbyCard extends Component<LobbyCardProps> {

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
      return joinCss(classnames, css.LobbyCard_Selected)
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
        className={joinCss(css.LobbyCard, classnames)} onClick={() => { onSelect(id); this.scroll()}}>
        <div className={joinCss(css.BuyIn, selected && css.BuyInSelected)}>Buy-in {toCurrency(buyIn, 0)}</div>
        <div className={joinCss(css.WinLabel, selected && css.WinLabelSelected)}>WIN UP TO</div>
        <div className={joinCss(css.Prize, selected && css.PrizeSelected)}>{prize}</div>
        <div className={joinCss(css.Game, selected && css.GameSelected)}>{game}</div>
        <div className={joinCss(css.Tickets, selected && css.TicketsSelected)}>{ticketsLeft} tickets left</div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(LobbyCard);

