import React, { Component } from "react";
import { connect } from "react-redux";
import jwtdecode from "jwt-decode";

import Login from "../components/Login";
import UserHomePage from "./userHomePage";

class ExamineUserEntry extends Component {
  render() {
    const tokenID = localStorage.tokenID;
    const authorized = this.props.authorized;
    const decodedToken = tokenID ? jwtdecode(tokenID) : undefined;
    const homePage = tokenID && decodedToken.exp * 1000 > Date.now();
    return (
      <div className="container">{homePage ? <UserHomePage /> : <Login />}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized
  };
};

export default connect(mapStateToProps, null)(ExamineUserEntry);
