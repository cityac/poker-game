import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';

import Stepper from '~/components/Game/RoundAction/Stepper/Stepper';
import ActionButton from '~/components/Game/RoundAction/ActionButton/ActionButton';

import * as css from './RoundActions.scss';
import { Tapable } from 'tapable';

const RoundActions = (props) => {
  const { balance, bet = 0, raise = 0, pot, preselectRaise } = props;

  return (
  <div className={css.Container}>
    <div className={css.RoundActions}>
      <div className={css.Stepper}>
        <Stepper  value={props.raise} onChangeRaise={preselectRaise} min={bet} max={Math.floor(balance)}/>
      </div>
      <div className={css.RaiseActions}>
        <ActionButton labels={['1/2']} onClick={ () => preselectRaise(Math.floor(balance / 2)) } />
        <ActionButton labels={['3/4']} onClick={ () => preselectRaise(Math.floor(balance * 3 / 4) )} />
        <ActionButton labels={['pot']} onClick={ () => preselectRaise(Math.floor(pot)) } />
        <ActionButton labels={['max']} onClick={ () => preselectRaise(Math.floor(balance)) }/>
      </div>
      
      <div className={css.FoldActions}>
        <ActionButton labels={['fold']}
          className={css.Button_Fold}
          onClick={ () => {} } />
          
        <ActionButton labels={[bet.toString(), 'call']}
          className={css.Button_Call} onClick={ () => {} } />

        <ActionButton labels={[raise.toString(), 'raise to']}
        className={css.Button_Raise}
          onClick={ () => {} } />
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
  raise: table.preselectRaise || player.preselectRaise || table.bet,
  tableId: table.id,
  bet: table.bet,
  pot: table.pot,
  balance: mapPlayerBalance(table.players, auth.userId),

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRaise: (raise, tableId) => dispatch(actions.preselectRaise(raise, tableId)),
});

const mergeProps = (propsFromState, propsFromDispatch) => {
  return {
      preselectRaise: (raise) => propsFromDispatch.dispatchRaise(raise, propsFromState.tableId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RoundActions);