import React, { Component } from "react";
import { connect } from "react-redux";

import { gradeSubmission } from "../../redux/user/actions";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "reactstrap";

class FinishExam extends Component {
  componentDidMount() {
    this.props.gradeSubmission(this.props.submissionID);
  }

  render() {
    const grading = this.props.grading;
    const submissionID = this.props.submissionID;
    if (grading) {
      return <LoadingSpinner />;
    }
    return (
      <div>
        <p>Exam Graded!</p>
        <Button href={`/viewresults/${submissionID}`}>View Results</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grading: state.user.grading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gradeSubmission: (submissionID) => dispatch(gradeSubmission(submissionID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishExam);
