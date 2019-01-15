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
    <div className={css.RoundActions}>
      
      <div className={css.Actions}>
        <ActionButton className={css.Button_Stepper_Level} labels={['1/2']} onClick={ () => preselectRaise(Math.floor(balance / 2)) } />
        <ActionButton className={css.Button_Stepper_Level} labels={['3/4']} onClick={ () => preselectRaise(Math.floor(balance * 3 / 4) )} />
        <ActionButton className={css.Button_Stepper_Level} labels={['pot']} onClick={ () => preselectRaise(Math.floor(pot)) } />
        <ActionButton className={css.Button_Stepper_Level} labels={['max']} onClick={ () => preselectRaise(Math.floor(balance)) }/>
      </div>
      <Stepper value={props.raise} onChangeRaise={preselectRaise} min={bet} max={Math.floor(balance)}/>
      <div className={css.Actions}>
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
  )
}

const mapPlayerBalance = (players, userId) => {
  if (players) {
    const player = players.find(el => el.userId === userId);
    return player && player.balance;
  }

  return;
}

const mapStateToProps = ({player, table, auth}) => ({
  raise: player.preselectRaise || table.bet,
  bet: table.bet,
  pot: table.pot,
  balance: mapPlayerBalance(table.players, auth.userId)

});

const mapDispatchToProps = (dispatch) => ({
  preselectRaise: value => dispatch(actions.preselectRaise(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoundActions);