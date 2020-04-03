import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingSpinner from "./LoadingSpinner";
import { startExam } from "../../redux/user/actions";

class ExamLauncher extends Component {
  componentDidMount() {
    this.props.startExam(this.props.examID);
  }

  render() {
    const pageMarkUp = this.props.launchingExam ? (
      <LoadingSpinner />
    ) : (
      <h2>{this.props.attemptDetails.exam.examName}</h2>
    );
    return <div>{pageMarkUp}</div>;
  }
}

const mapStateToProps = state => {
  return {
    launchingExam: state.user.startingExam,
    attemptDetails: state.user.attemptDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startExam: examID => dispatch(startExam(examID))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamLauncher);
