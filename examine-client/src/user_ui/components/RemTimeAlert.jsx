import React, { Component } from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";

import { closeRemTimeAlert } from "../../redux/user/actions";
import { REM_TIME } from "./../util/constants";

class RemTimeAlert extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Alert
        className="rem-time-alert"
        color="danger"
        isOpen={visible}
        toggle={this.props.close}
        style={{ position: "fixed" }}
      >
        Timer alert!
      </Alert>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visible: state.user.remTimeAlert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(closeRemTimeAlert()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemTimeAlert);
