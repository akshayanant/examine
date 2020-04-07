import React, { Component } from "react";
import { connect } from "react-redux";

import Timer from "./Timer";

class RightPane extends Component {
  render() {
    const timerMarkUp = this.props.timerRunning ? (
      <Timer
        // minutes={this.props.attemptDetails.exam.duration}
        minutes={this.props.attemptDetails.exam.duration}
        seconds={0}
        redirect={`/finishexam/${this.props.attemptDetails.submissionID}`}
      />
    ) : (
      ""
    );
    return <div>{timerMarkUp}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    timerRunning: state.user.timerRunning,
    attemptDetails: state.user.attemptDetails,
  };
};

export default connect(mapStateToProps, null)(RightPane);
