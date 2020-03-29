import React, { Component } from "react";
import { connect } from "react-redux";
import jwtdecode from "jwt-decode";
import { Spinner } from "reactstrap";

import Login from "../components/Login";
import UserHomePage from "./userHomePage";

class ExamineUserEntry extends Component {
  render() {
    const tokenID = localStorage.tokenID;
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const decodedToken = tokenID ? jwtdecode(tokenID) : undefined;
    const homePage = tokenID && decodedToken.exp * 1000 > Date.now();
    const mainPageMarkup = loading ? (
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
    ) : homePage ? (
      <UserHomePage />
    ) : (
      <Login />
    );

    return <div className="container">{mainPageMarkup}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, null)(ExamineUserEntry);
