import React, { Component } from "react";
import { connect } from "react-redux";

import { auth } from "../util/auth";
import Announcements from "./../components/Announcements";
import { Redirect } from "react-router-dom";

class AnnouncementsPage extends Component {
  render() {
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const valid = auth(localStorage.tokenID);

    const announcementsMarkUp = valid ? (
      <Announcements />
    ) : (
      <Redirect to="/login" />
    );
    return <div>{announcementsMarkUp}</div>;
  }
}
const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, null)(AnnouncementsPage);
