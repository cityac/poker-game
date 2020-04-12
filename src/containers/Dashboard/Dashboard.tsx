import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { fullScreen } from '~/utils';
import { switchGameMode } from '~/store/actions';

import DashboardTable from '~/components/Game/DashboardTable/DashboardTable';
import Table from '~/models/table';
import Player from '~/models/player';

import * as css from './Dashboard.scss';
import { initDashboard } from '../../store/actions';

interface DashboardProps {
  tables: Table[],
  players: Player[],
  onSwitchGameMode(on: boolean): void;
  onInitDashboard():void;
}

class Dashboard extends Component<DashboardProps> {
  componentDidMount() {
    // avoid call fullscreen api with no user iteraction
    // dirty hack
    // need to find better solution
    fullScreen(true);

    this.props.onSwitchGameMode(true);
    this.props.onInitDashboard();
  }   

  render() {
    return (
      <div className={css.Dashboard}>
      {this.props.tables.map(table => 
        <DashboardTable key={table.id} 
          tableId={table.id}
          pot={table.pot} 
          players={table.players}
          playerCards={table.playerCards}
          flopCards={table.flopCards} />)
      }
        <DashboardTable tableId={undefined} />
       
      </div>
    )
  }
}

const mapStateToProps = ({ player, auth}) => {
  return {
    tables: player.tables || [],
    initialized: player.tables && player.tables.length,
  };
};

const mapDispatchToProps = dispatch => ({
  onSwitchGameMode: (on: boolean): void => dispatch(switchGameMode(on)),
  dispatchInitDashboard: (tablesIds): void => dispatch(initDashboard(tablesIds)),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  return {
      ...propsFromState,
      ...propsFromDispatch,
      ...ownProps,
      onInitDashboard: () => { propsFromDispatch.dispatchInitDashboard(propsFromState.tables.map(el => el.id)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Dashboard);