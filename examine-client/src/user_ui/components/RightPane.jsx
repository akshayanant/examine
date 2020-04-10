import React, { Component } from "react";
import { connect } from "react-redux";

import Timer from "./Timer";
import GradeCard from "./GradeCard";

class RightPane extends Component {
  render() {
    const viewingGrade = this.props.viewingGrade;
    if (viewingGrade) {
      return (
        <div>
          <GradeCard
            totalQuestions={this.props.grade.gradeCard.totalQuestions}
            attempted={this.props.grade.gradeCard.attempted}
            correct={this.props.grade.gradeCard.correct}
            wrong={this.props.grade.gradeCard.wrong}
            hitRate={this.props.grade.gradeCard.hitRate}
            points={this.props.grade.gradeCard.points.toFixed(2)}
            fetchingGrades={this.props.fetchingGrades}
          />
        </div>
      );
    }
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
    viewingGrade: state.user.viewingGrade,
    grade: state.user.grade,
    fetchingGrades: state.user.fetchingGrades,
  };
};

export default connect(mapStateToProps, null)(RightPane);
