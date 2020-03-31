import React, { Component } from "react";
import { connect } from "react-redux";

import { auth } from "./../util/auth";
import { Redirect } from "react-router-dom";
import Exams from "./../components/Exams";

class ExamsPage extends Component {
  render() {
    const valid = auth(localStorage.tokenID);
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const examsMarkUp = valid ? <Exams /> : <Redirect to="/login" />;
    return <div>{examsMarkUp}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, null)(ExamsPage);
