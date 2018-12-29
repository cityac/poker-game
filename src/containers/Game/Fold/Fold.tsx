import * as React from 'react';
import * as css from './Fold.scss';

import { joinCss } from '~/utils';

const Fold = () => {

  return (
    <div className={css.Fold}>
      <div className={css.Stepper}>
        <button className={joinCss(css.Button, css.Button_Stepper, css.Button_Stepper_Minus)}></button>
        <div> Slider </div>
        <button className={joinCss(css.Button, css.Button_Stepper, css.Button_Stepper_Plus)}></button>
      </div>
      <div className={css.Actions}>
        <button className={css.Button}>1/2</button>
        <button className={css.Button}>3/4</button>
        <button className={css.Button}>pot</button>
        <button className={css.Button}>max</button>
      </div>
      <div className={css.Actions}>
        <button className={joinCss(css.Button, css.Button_Fold)}>
          <div className={css.Button_LabelWrap}>fold</div>
        </button>
        <button className={joinCss(css.Button, css.Button_Call)}>
          <div className={css.Button_LabelWrap}>20</div>
          <div className={css.Button_LabelWrap}>call</div>
        </button>
        <button className={joinCss(css.Button, css.Button_Raise)}>
          <div className={css.Button_LabelWrap}>80</div>
          <div className={css.Button_LabelWrap}>raise to</div>
        </button>
      </div>
    </div>
  )
}

export default Fold;