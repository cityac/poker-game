import * as React from 'react';

import Stepper from '~/components/Game/RoundAction/Stepper/Stepper';
import ActionButton from '~/components/Game/RoundAction/ActionButton/ActionButton';

import * as css from './RoundActions.scss';
const RoundActions = () => {

  return (
    <div className={css.RoundActions}>
      <Stepper />
      <div className={css.Actions}>
        <ActionButton labels={['1/2']} />
        <ActionButton labels={['3/4']} />
        <ActionButton labels={['pot']} />
        <ActionButton labels={['max']} />
      </div>
      <div className={css.Actions}>
        <ActionButton labels={['fold']} className={css.Button_Fold} />
        <ActionButton labels={['20', 'call']} className={css.Button_Call} />
        <ActionButton labels={['80', 'raise to']} className={css.Button_Raise} />
      </div>
    </div>
  )
}

export default RoundActions;