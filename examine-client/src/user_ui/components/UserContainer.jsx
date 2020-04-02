import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExamineUserEntry from "./../pages/examineUserEntry";
import UserNavbar from "./UserNavbar";
import AuthRoute from "./../util/AuthRoute";
import examineUserEntry from "./../pages/examineUserEntry";
import Login from "./Login";
import UserNavLinks from "./UserNavLinks";
import AnnouncementsPage from "./../pages/announcementsPage";
import ExamsPage from "./../pages/exams";

class UserContainer extends Component {
  render() {
    return (
      <Router>
        <UserNavbar />
        <div className="user-container">
          <div className="user-nav-links">
            <UserNavLinks />
          </div>
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/" component={examineUserEntry} />
            <Route exact path="/announcements" component={AnnouncementsPage} />
            <Route exact path="/exams" component={ExamsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default UserContainer;
