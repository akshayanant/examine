import React, { Component } from "react";
import { Button } from "reactstrap";

class PrimaryButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        style={{
          color: "white",
          backgroundColor: "#8C1D40",
          borderColor: "#8C1D40",
        }}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default PrimaryButton;
