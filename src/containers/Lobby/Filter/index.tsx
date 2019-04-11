import * as React from 'react';
import { Component } from 'react';

import { connect } from 'react-redux';

import {
  changeGameFilter,
  changeBuyInFilter,
  applyFilter,
  resetFilter,
} from '~/store/actions';

import { cn, toCurrency } from '~/utils';

import * as css from './Filter.scss';
import * as commonCss from '../Lobby.scss'; 

interface LobbyFilter extends React.HTMLAttributes<any> {
  buyIns: number[],
  gameTypes:  string[],
  gameTypeFilter: string[],
  buyInFilter: number[],
  filteredSpins: [],
  onApplyFilter():void,
  onResetFilter():void,
  onClose(): void,
  onChangeGameTypeFilter(gameType: string):void,
  onChangeBuyInFilter(buyIn: number):void,
}

class LobbyFilter extends Component<LobbyFilter> {
  

  getSelectedClass = (value) => {
    const { gameTypeFilter, buyInFilter } = this.props;

    return (gameTypeFilter.indexOf(value) !== -1 || buyInFilter.indexOf(value ) !== -1)
    ? commonCss.SelectButton_Selected
    : undefined;
  }

  renderBuyIns = (start, end) => (
    this.props.buyIns.map((buyIn, index) => {
      return index >= start && index <= end 
      ? (<div key={buyIn} className={cn(css.SelectBuyInButton, commonCss.SelectButton, this.getSelectedClass(buyIn) )}
            onClick={() => {this.props.onChangeBuyInFilter(buyIn)}}
          >{toCurrency(buyIn)}</div>
        )
      : null
    })
  )

  onApplyFilter = () => {
    this.props.onApplyFilter();
    this.props.onClose();
  }

  render() {
    const { className, gameTypes, filteredSpins, onClose, onChangeGameTypeFilter, onResetFilter } = this.props;
    return (
    <div className={cn(className, css.Filter)}>
       <div className={commonCss.Header}>
        <div className={commonCss.Label}>Filter</div>
        <div className={commonCss.Icons}>
          <div className={commonCss.Icons_Filter_Close} onClick={onClose}/>
        </div>
       </div>
       <hr/>

      <div className={css.FilterComponent}>
        <div className={cn(commonCss.LobbyLabel, css.SelectGameTypeLabel)}>select game type</div>
        <div className={cn(commonCss.ActionButtons, css.ActionButtons)}>
          {
            gameTypes.map(type => (
              <div key={type} className={cn(css.SelectGameButton, commonCss.SelectButton, this.getSelectedClass(type) )}
                onClick={() => {onChangeGameTypeFilter(type)}}
              >{type}</div>
            ))
          }
        </div>
      </div>

      <div className={css.FilterComponent}>
        <div className={cn(commonCss.LobbyLabel, css.SelectGameTypeLabel)}>select buy-ins</div>
      
        <div className={cn(commonCss.ActionButtons, css.ActionButtons)}>
          {
            this.renderBuyIns(0,3)
          }
        </div>
        <div className={cn(commonCss.ActionButtons, css.ActionButtons)}>
          {
            this.renderBuyIns(4,7)
          }
        </div>
        <div className={cn(commonCss.ActionButtons, css.ActionButtons)}>
          {
            this.renderBuyIns(8,11)
          }
        </div>
      </div>

      <div className={cn(commonCss.LobbyComponent, css.ApplyFilter)}>
        <div className={cn(commonCss.LobbyLabel)}>
        { `${filteredSpins.length} spins found`}
        </div>
      </div>

      <div className={cn(commonCss.LobbyComponent, css.ApplyFilter)}>
        <div className={commonCss.ApplyButtons}>
          <button className={commonCss.ApplyButtons_Apply} 
            onClick={()=>this.onApplyFilter()}
          >
            Apply
          </button>
          <button className={cn(commonCss.ApplyButtons_Reset)}
            onClick={onResetFilter}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({lobby}) => ({
  gameTypeFilter: lobby.gameTypesFilter,
  buyInFilter: lobby.buyInsFilter,
  buyIns: lobby.buyIns,
  gameTypes: lobby.gameTypes,
  filteredSpins: lobby.filteredSpins,
})

const mapDispatchToProps = dispatch => ({
  onChangeGameTypeFilter: (gameType) => dispatch(changeGameFilter(gameType)),
  onChangeBuyInFilter: (buyIn) => dispatch(changeBuyInFilter(buyIn)),
  onApplyFilter: () => dispatch(applyFilter()),
  onResetFilter: () => dispatch(resetFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LobbyFilter);
