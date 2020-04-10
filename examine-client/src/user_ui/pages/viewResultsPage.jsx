import React, { Component } from "react";
import { connect } from "react-redux";

import ViewResults from "./../components/ViewResults";
import { startViewingGrades, endViewingGrades } from "../../redux/user/actions";
import { auth } from "./../util/auth";
import { Redirect } from "react-router-dom";

class ViewResultsPage extends Component {
  componentWillMount() {
    this.props.startViewingGrades();
  }
  componentWillUnmount() {
    this.props.endViewingGrades();
  }
  render() {
    const valid = auth(localStorage.tokenID);
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    if (!valid) {
      return <Redirect to="/" />;
    }
    return <ViewResults submissionID={this.props.match.params.submissionID} />;
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startViewingGrades: () => dispatch(startViewingGrades()),
    endViewingGrades: () => dispatch(endViewingGrades()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewResultsPage);
