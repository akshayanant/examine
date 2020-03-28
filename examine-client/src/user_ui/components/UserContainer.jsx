import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExamineUserEntry from "./../pages/examineUserEntry";
import UserNavbar from "./UserNavbar";

class UserContainer extends Component {
  render() {
    return (
      <Router>
        <UserNavbar />
        <div>
          <Switch>
            <Route exact path="/" component={ExamineUserEntry} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default UserContainer;
