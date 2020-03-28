import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "./../../redux/user/actions";

class UserNavbar extends Component {
  render() {
    const buttonMarkup = this.props.authorized ? (
      <Button onClick={this.props.logout}>Logout</Button>
    ) : (
      ""
    );
    return (
      <Navbar color="light" light>
        <h1 href="/">ExaMine</h1>
        {buttonMarkup}
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
