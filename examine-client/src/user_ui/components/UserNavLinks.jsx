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
        <p>List Based</p>
        <Nav tabs vertical>
          <NavItem>
            <NavLink active href="/announcements">
              Announcements
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="#">
              Exams
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="#">
              Assignments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled href="#">
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

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, null)(UserNavLinks);
