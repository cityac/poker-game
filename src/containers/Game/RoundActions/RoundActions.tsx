import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';

import Stepper from '~/components/Game/RoundAction/Stepper/Stepper';
import ActionButton from '~/components/Game/RoundAction/ActionButton/ActionButton';

import * as css from './RoundActions.scss';
const RoundActions = (props) => {

  return (
    <div className={css.RoundActions}>
      <Stepper value={props.raise} onChangeRaise={props.preselectRaise}/>
      <div className={css.Actions}>
        <ActionButton labels={['1/2']} />
        <ActionButton labels={['3/4']} />
        <ActionButton labels={['pot']} />
        <ActionButton labels={['max']} />
      </div>
      <div className={css.Actions}>
        <ActionButton labels={['fold']} className={css.Button_Fold} />
        <ActionButton labels={[props.bet.toString(), 'call']} className={css.Button_Call} />
        <ActionButton labels={[props.raise.toString(), 'raise to']} className={css.Button_Raise} />
      </div>
    </div>
  )
}

const mapStateToProps = ({game}) => ({
  raise: game.currentTable.user.raiseValue || game.currentTable.bet,
  bet: game.currentTable.bet,
});

const mapDispatchToProps = (dispatch) => ({
  preselectRaise: value => dispatch(actions.preselectRaise(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RoundActions);