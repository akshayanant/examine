import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExamineUserEntry from "./../pages/examineUserEntry";
import UserNavbar from "./UserNavbar";
import AuthRoute from "./../util/AuthRoute";
import examineUserEntry from "./../pages/examineUserEntry";
import Login from "./Login";
import UserNavLinks from "./UserNavLinks";
import AnnouncementsPage from "./../pages/announcementsPage";

class UserContainer extends Component {
  render() {
    return (
      <Router>
        <UserNavbar />
        <div className="user-container">
          <div className="user-nav-links"></div>
          <UserNavLinks />
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/" component={examineUserEntry} />
            <Route exact path="/announcements" component={AnnouncementsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default UserContainer;
