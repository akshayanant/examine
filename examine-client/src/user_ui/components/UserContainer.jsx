import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserHomePage from "./../pages/userHomePage";

class UserContainer extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={UserHomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default UserContainer;
