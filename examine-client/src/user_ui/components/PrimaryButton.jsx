import React, { Component } from "react";
import { Button } from "reactstrap";

class PrimaryButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        style={{
          color: "white",
          backgroundColor: "#b90d63",
          borderColor: "#b90d63",
        }}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default PrimaryButton;
