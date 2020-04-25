import React, { Component } from "react";
import { Navbar, NavbarBrand, Button, Badge } from "reactstrap";
import { connect } from "react-redux";
import { userLogout } from "./../../redux/user/actions";
import { auth } from "../util/auth";

class UserNavbar extends Component {
  render() {
    const valid = auth(localStorage.tokenID);
    const authorized = this.props.authorized;
    const loading = this.props.loading;
    const buttonMarkup = valid ? (
      <Button onClick={this.props.logout} disabled={loading} color="light">
        Logout
      </Button>
    ) : (
      ""
    );
    return (
      <Navbar className="dark-background">
        <NavbarBrand href="/">
          <h3 style={{ color: "white" }}>ExaMine</h3>
        </NavbarBrand>
        {buttonMarkup}
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorized: state.user.authorized,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
