import React, { Component } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="navbar-container">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/exams">
            Exams
          </Button>
          <Button color="inherit" component={Link} to="/questions">
            Questions
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
