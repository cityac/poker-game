import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';

class Logout extends Component {
  constructor(props) {
    super(props);
    props.onLogout();
  }

  render() {
    return null;
  }
}
const mapStateToProps = (state) => {
  return {
    authRedirectPath: state.auth.authRedirectPath,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
