import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";

import { auth } from "./../util/auth";

class UserNavLinks extends Component {
  render() {
    const valid = auth(localStorage.tokenID);
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const navMarkUp = valid ? (
      <div>
        <h4>Dashboard</h4>
        <hr></hr>
        <Nav tabs vertical>
          <NavItem>
            <NavLink disabled className="user-nav-item ">
              Announcements
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/exams" className="user-nav-item ">
              Exams
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#" className="user-nav-item ">
              Assignments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#" className="user-nav-item ">
              Discussions
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    ) : (
      ""
    );
    return <div>{navMarkUp}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps, null)(UserNavLinks);
