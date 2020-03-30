import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { auth } from "./auth";

const AuthRoute = ({ component: Component, authorized, loading }) => {
  const valid = auth(localStorage.tokenID);
  return (
    <Route
      render={props =>
        valid === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};
export default connect(mapStateToProps, null)(AuthRoute);
