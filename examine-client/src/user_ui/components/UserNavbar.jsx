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
      <Button onClick={this.props.logout} disabled={loading}>
        Logout
      </Button>
    ) : (
      ""
    );
    return (
      <Navbar color="light" light>
        <NavbarBrand href="/">
          <Badge color="light">
            <h3>ExaMine</h3>
          </Badge>
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
