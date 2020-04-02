import React, { Component } from "react";
import { connect } from "react-redux";
import jwtdecode from "jwt-decode";
import { Spinner } from "reactstrap";
import { Redirect } from "react-router-dom";

import Login from "../components/Login";
import UserHomePage from "./userHomePage";
import { auth } from "./../util/auth";
import LoadingSpinner from "./../components/LoadingSpinner";

class ExamineUserEntry extends Component {
  render() {
    const valid = auth(localStorage.tokenID);
    const mainPageMarkup = this.props.loading ? (
      <div>
        <LoadingSpinner />
      </div>
    ) : valid ? (
      <UserHomePage />
    ) : (
      <Redirect to="/login" />
    );

    return <div>{mainPageMarkup}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, null)(ExamineUserEntry);
