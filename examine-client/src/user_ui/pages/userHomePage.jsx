import React, { Component } from "react";
import { connect } from "react-redux";

import Login from "./../components/Login";

class UserHomePage extends Component {
  render() {
    const tokenID = this.props.tokenID;
    return <div>{tokenID ? <h1>Hello Student</h1> : <Login />}</div>;
  }
}

const mapStateToProps = state => {
  return {
    tokenID: state.user.tokenID
  };
};

export default connect(mapStateToProps, null)(UserHomePage);
