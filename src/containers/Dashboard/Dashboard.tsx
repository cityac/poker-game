import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { fullScreen } from '~/utils';
import { switchGameMode } from '~/store/actions';

import DashboardTable from '~/components/Game/DashboardTable/DashboardTable';
import Table from '~/models/table';

import * as css from './Dashboard.scss';

interface DashboardProps {
  tables: Table[],
  onSwitchGameMode(on: boolean): void;
}

class Dashboard extends Component<DashboardProps> {
  componentDidMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack
    // need to find better solution
    fullScreen(true);

    this.props.onSwitchGameMode(true);
  }   
  render() {
    return (
      <div className={css.Dashboard}>
      {this.props.tables.map(table => 
        <DashboardTable key={table.id} 
          tableId={table.id} 
          pot={table.pot} 
          playerCards={table.playerCards}
          flopCards={table.flopCards} />)}
        <DashboardTable tableId={undefined} />
       
      </div>
    )
  }
}

const mapStateToProps = ({ player }) => {
  return {
    tables: player.tables,
    initialized: player.tables && player.tables.length,
  };
};

const mapDispatchToProps = dispatch => ({
  onSwitchGameMode: (on: boolean): void => dispatch(switchGameMode(on)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);