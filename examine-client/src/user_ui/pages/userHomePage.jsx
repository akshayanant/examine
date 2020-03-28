import React, { Component } from "react";
import UserNavLinks from "./../components/UserNavLinks";

class UserHomePage extends Component {
  render() {
    return (
      <div className="user-pages-generic">
        <div className="user-page-left">
          <UserNavLinks />
        </div>
        <div className="user-page-center">
          <p>----------Main Content------------</p>
        </div>
        <div className="user-page-right">
          <p> Right Right Right</p>
        </div>
      </div>
    );
  }
}

export default UserHomePage;
