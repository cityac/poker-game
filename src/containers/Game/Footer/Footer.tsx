import * as React from 'react';
import { connect } from 'react-redux';
import BackButton from '~/components/Game/BackButton/BackButton';
import ChatButton from '~/components/Game/ChatButton/ChatButton';
import TableSelect from '~/components/Game/TableSelect/TableSelect';

import * as css from './Footer.scss';

const Footer = (props) => (
    <div className={css.Footer}>
      <BackButton  to={props.backPath || '/auth'} />
      <div className={css.TableSelect__Item}>
        {props.tables.map(table => <TableSelect key={table.id} table={table} />)}
        <TableSelect />
      </div>
      <ChatButton />
    </div>
  )

const mapStateToProps = (state) => {
  return {
    tables: state.game.tables,
  };
};

export default connect(mapStateToProps)(Footer);
