import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import { connect } from "react-redux";
import { userLogout } from "./../../redux/user/actions";

class UserNavbar extends Component {
  render() {
    const tokenID = localStorage.tokenID;
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const buttonMarkup = tokenID ? (
      <Button onClick={this.props.logout}>Logout</Button>
    ) : (
      ""
    );
    return (
      <Navbar color="light" light>
        <NavbarBrand href="/">ExaMine</NavbarBrand>
        {buttonMarkup}
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(userLogout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
