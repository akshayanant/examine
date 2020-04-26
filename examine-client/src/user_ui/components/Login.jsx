import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";

import { userLogin, userSignUp } from "./../../redux/user/actions";
import PrimaryButton from "./PrimaryButton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.handleChangeLoginEmail = this.handleChangeLoginEmail.bind(this);
    this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
    this.handleChangeNewEmail = this.handleChangeNewEmail.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewAcc = this.handleNewAcc.bind(this);
    this.handleChangeNewFirstName = this.handleChangeNewFirstName.bind(this);
    this.handleChangeNewLastName = this.handleChangeNewLastName.bind(this);
  }

  handleChangeLoginEmail = (event) => {
    this.setState({ loginEmail: event.target.value });
  };
  handleChangeLoginPassword = (event) => {
    this.setState({ loginPassword: event.target.value });
  };
  handleChangeNewFirstName = (event) => {
    this.setState({ newFirstName: event.target.value });
  };
  handleChangeNewLastName = (event) => {
    this.setState({ newLastName: event.target.value });
  };
  handleChangeNewEmail = (event) => {
    this.setState({ newEmail: event.target.value });
  };
  handleChangeNewPassword = (event) => {
    this.setState({ newPassword: event.target.value });
  };
  handleChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleLogin = () => {
    const user = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };
    this.props.login(user);
  };

  handleNewAcc = () => {
    const newUser = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signup(newUser);
  };

  render() {
    const loading = this.props.loading;
    const authErrorMarkup = this.props.authError ? (
      <p className="auth-error">Invalid Credentials . . . Please try agian </p>
    ) : (
      ""
    );
    return (
      <Form className="login-container">
        <div className="login-heading">
          <h1>ExaMine</h1>
        </div>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            onChange={this.handleChangeLoginEmail}
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={this.handleChangeLoginPassword}
          />
        </FormGroup>
        <div>{authErrorMarkup}</div>
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.handleLogin}
          disabled={loading}
        >
          Login
        </Button>
        <hr></hr>
        <div>
          <Label>Not a Member yet?</Label>
        </div>
        <Label className="pb-3">Sign up with your details below!</Label>
        <div className="login-names">
          <FormGroup>
            <Label>First Name</Label>
            <Input
              placeholder="First Name"
              onChange={this.handleChangeNewFirstName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              placeholder="Last Name"
              onChange={this.handleChangeNewLastName}
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            onChange={this.handleChangeNewEmail}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={this.handleChangeNewPassword}
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Password"
            onChange={this.handleChangeConfirmPassword}
          />
        </FormGroup>
        <PrimaryButton
          disabled={loading}
          onClick={this.handleNewAcc}
          name="Sign Up"
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.user.authError,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => {
      dispatch(userSignUp(user));
    },
    login: (user) => {
      dispatch(userLogin(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
