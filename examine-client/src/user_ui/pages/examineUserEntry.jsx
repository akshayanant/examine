import React, { Component } from "react";
import { connect } from "react-redux";
import jwtdecode from "jwt-decode";
import { Spinner } from "reactstrap";

import Login from "../components/Login";
import UserHomePage from "./userHomePage";
import { auth } from "./../util/auth";
import { Redirect } from "react-router-dom";

class ExamineUserEntry extends Component {
  render() {
    const valid = auth(localStorage.tokenID);
    const mainPageMarkup = this.props.loading ? (
      <div>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="light" />
        <Spinner type="grow" color="dark" />
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
