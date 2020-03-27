import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";

import { userEntry } from "./../../redux/user/actions";

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
      confirmPassword: ""
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

  handleChangeLoginEmail = event => {
    this.setState({ loginEmail: event.target.value });
  };
  handleChangeLoginPassword = event => {
    this.setState({ loginPassword: event.target.value });
  };
  handleChangeNewFirstName = event => {
    this.setState({ newFirstName: event.target.value });
  };
  handleChangeNewLastName = event => {
    this.setState({ newLastName: event.target.value });
  };
  handleChangeNewEmail = event => {
    this.setState({ newEmail: event.target.value });
  };
  handleChangeNewPassword = event => {
    this.setState({ newPassword: event.target.value });
  };
  handleChangeConfirmPassword = event => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleLogin = () => {
    const user = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };
    axios
      .post("/signin", user)
      .then(res => {
        this.props.entry(res.data.tokenID);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNewAcc = () => {
    const newUser = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };
    axios
      .post("/signup", newUser)
      .then(res => {
        this.props.entry(res.data.tokenID);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
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
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.handleLogin}
        >
          Login
        </Button>
        <hr></hr>
        <div>
          <Label className="pt-5">Not a Member yet?</Label>
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
        <Button className="btn btn-success" onClick={this.handleNewAcc}>
          Sign up
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    entry: tokenID => {
      dispatch(userEntry(tokenID));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
