import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ExamineUserEntry from "./../pages/examineUserEntry";
import UserNavbar from "./UserNavbar";
import AuthRoute from "./../util/AuthRoute";
import examineUserEntry from "./../pages/examineUserEntry";
import Login from "./Login";
import UserNavLinks from "./UserNavLinks";
import AnnouncementsPage from "./../pages/announcementsPage";
import ExamsPage from "./../pages/exams";
import ExamLauncherPage from "./../pages/examLauncherPage";
import { auth } from "../util/auth";
import FinishExamPage from "../pages/finishExamPage";

class UserContainer extends Component {
  render() {
    const navLinksMarkUp = auth(localStorage.tokenID) ? (
      <div className="user-nav-links">
        <UserNavLinks />
      </div>
    ) : (
      ""
    );
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    return (
      <Router>
        <UserNavbar />
        <div className="user-container">
          {navLinksMarkUp}
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/" component={examineUserEntry} />
            <Route exact path="/announcements" component={AnnouncementsPage} />
            <Route exact path="/exams" component={ExamsPage} />
            <Route
              exact
              path="/launchexam/:examID"
              component={ExamLauncherPage}
            />
            <Route
              exact
              path="/finishexam/:submissionID"
              component={FinishExamPage}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps, null)(UserContainer);
