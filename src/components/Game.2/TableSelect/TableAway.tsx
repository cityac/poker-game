import * as React from 'react';
import svgs from '~/utils/svgs';

const TableAway = (props) => {
  // className={joinCss(classNames)} 
  return (
    <svg style={props.style} viewBox="-2,0,80,40"  >
      <use xlinkHref={`${svgs.away_table}#away_table`}
        x="-20" y="-20"
      />
    </svg>
  )
}

export default TableAway