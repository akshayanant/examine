import React, { Component } from "react";
import { Button } from "reactstrap";

class SecondaryButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        style={{
          color: "white",
          backgroundColor: "#39424e",
          borderColor: "#39424e",
        }}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default SecondaryButton;
