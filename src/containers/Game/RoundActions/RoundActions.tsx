import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';

import Stepper from '~/components/Common/Stepper/Stepper';
import ActionButton from '~/components/Game/RoundAction/ActionButton/ActionButton';

import * as css from './RoundActions.scss';

import { joinCss } from '~/utils';

const RoundActions = (props) => {
  const { balance, bet = 0, raise = 0, pot, preselectRaise, onShowChat } = props;

  return (
  <div className={css.Container}>
    <button className={css.ChatButton} onClick={() => onShowChat()}></button>
    <div className={css.RoundActions}>
      <div className={css.Stepper}>
        <Stepper 
          styles={{color: '#FFF', opacity: '0.7'}}
          value={props.raise}
          onChangeRaise={preselectRaise}
          min={bet}
          max={Math.floor(balance)}
          editable/>
      </div>
      <div className={css.RaiseActions}>
        <ActionButton labels={['1/2']} onClick={ () => preselectRaise(Math.floor(balance / 2)) } />
        <ActionButton labels={['3/4']} onClick={ () => preselectRaise(Math.floor(balance * 3 / 4) )} />
        <ActionButton labels={['pot']} onClick={ () => preselectRaise(Math.floor(pot)) } />
        <ActionButton labels={['max']} onClick={ () => preselectRaise(Math.floor(balance)) }/>
      </div>
      
      <div className={css.FoldActions}>
        <div className={css.Button_Wrapper} >
          {/* <div className={joinCss(css.Button, css.Button_Back, css.Button_Fold_Back)} /> */}
          <ActionButton labels={['fold']}
            className={joinCss(css.Button, css.Button_Fold)}
            onClick={ () => {} } />
        </div>
        
        <div className={joinCss(css.Button_Wrapper, css.Button_Wrapper_Middle)} >
          {/* <div className={joinCss(css.Button, css.Button_Back, css.Button_Call_Back)} /> */}
          <ActionButton labels={[bet.toString(), 'call']}
            className={joinCss(css.Button, css.Button_Call)} onClick={ () => {} } />
        </div>
        
        <div className={css.Button_Wrapper} >
          {/* <div className={joinCss(css.Button, css.Button_Back, css.Button_Raise_Back)} /> */}
          <ActionButton labels={[raise.toString(), 'raise to']}
            className={joinCss(css.Button, css.Button_Raise)}
            onClick={ () => {} } />
        </div>
      </div>
    </div>
  </div>
  );
};

const mapPlayerBalance = (players, userId) => {
  if (players) {
    const player = players.find(el => el.userId === userId);
    return player && player.balance;
  }

  return;
};

const mapStateToProps = ({player, table, auth}) => ({
  raise: table.preselectRaise || table.bet,
  tableId: table.id,
  bet: table.bet,
  pot: table.pot,
  balance: mapPlayerBalance(table.players, auth.userId),

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRaise: (raise, tableId) => dispatch(actions.preselectRaise(raise, tableId)),
  onShowChat: () => dispatch(actions.switchChatMode(true)),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  return {
      ...propsFromState,
      ...ownProps,
      onShowChat: propsFromDispatch.onShowChat,
      preselectRaise: (raise) => { propsFromDispatch.dispatchRaise(raise, propsFromState.tableId); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RoundActions);