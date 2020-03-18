import React, { Component } from "react";
import { Nav, NavLink, NavItem } from "reactstrap";
class Navbar extends Component {
  render() {
    return (
      <Nav tabs pills justified className="navbar-container">
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/exams">Exams</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/questions">Questions</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default Navbar;
