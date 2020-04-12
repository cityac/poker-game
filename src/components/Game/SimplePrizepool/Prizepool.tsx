import * as React from 'react';
import * as css from './Prizepool.scss';

const Prizepool = (props) => ( 
  <div className={css.PrizePool}>
    <label className={css.PrizePool_Prize}>Prizepool <span className={css.PrizePool_Money}>$10,000</span></label>
  </div>
)


export default Prizepool;