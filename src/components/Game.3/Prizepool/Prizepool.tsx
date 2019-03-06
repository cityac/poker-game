import * as React from 'react';
import CoinsFall from './CoinsFall';
import * as css from './Prizepool.scss';

const Prizepool = (props) => ( 
  <div>
    <div className={css.CoinsFall_Container}>
      <CoinsFall />
    </div>
    <div className={css.PrizePool}>
      <label className={css.PrizePool_Prize}>prizepool</label>
      <label className={css.PrizePool_Money}>$003,605</label>
    </div>
  </div>
)


export default Prizepool;