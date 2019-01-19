import * as React from 'react';
import { connect } from 'react-redux';
import BackButton from '~/components/Game/BackButton/BackButton';
import ChatButton from '~/components/Game/ChatButton/ChatButton';
import  TableSelect from '~/components/Game/TableSelect/TableSelect';

import { selectTable } from '~/store/actions';

import * as css from './Footer.scss';

const Footer = (props) => (
    <div className={css.Footer}>
      <BackButton  to={props.backPath || '/auth'} />
      <div className={css.TableSelect__Item}>
        {props.tables.map(table => (
          <TableSelect key={table.id} 
            table={table} 
            currentTableId={props.currentTableId}
            onSelect={props.onSelectTable}
            />)
        )}
        <TableSelect onSelect={() => alert('Implementation pending')}/>
      </div>
      <ChatButton />
    </div>
  );

const mapStateToProps = ({player, table}) => {
  return {
    currentTableId: table.id,
    tables: player.tables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectTable: (tableId) => dispatch(selectTable(tableId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
