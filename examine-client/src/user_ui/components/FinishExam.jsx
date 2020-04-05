import React, { Component } from "react";
import { connect } from "react-redux";
import { gradeSubmission } from "../../redux/user/actions";

class FinishExam extends Component {
  componentDidMount() {
    this.props.gradeSubmission(this.props.submissionID);
  }

  render() {
    return <h1>Results . . .</h1>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    gradeSubmission: (submissionID) => dispatch(gradeSubmission(submissionID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishExam);
