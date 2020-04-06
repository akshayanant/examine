import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody } from "reactstrap";

import { fetchGrades } from "../../redux/user/actions";
import LoadingSpinner from "./LoadingSpinner";
import QuestionGradeCard from "./QuestionGradeCard";

class ViewResults extends Component {
  componentDidMount() {
    this.props.fetchGrades(this.props.submissionID);
  }
  render() {
    const fetchingGrades = this.props.fetchingGrades;
    if (fetchingGrades) {
      return <LoadingSpinner />;
    }
    let index = 1;
    const questionsMarkUp = this.props.grade.grading.map((question) => {
      return (
        <QuestionGradeCard
          questionID={question.questionID}
          userSelection={question.userSelection}
          correctAnswer={question.correctAnswer}
          point={question.point}
          index={index++}
        />
      );
    });
    return (
      <div className="main-content-container">
        <Card className="exam-launcher-card">
          <CardHeader className="exam-launcher-card">
            <div className="exam-heading">
              <h4>{this.props.grade.examName}</h4>
              <div>
                <h4>Score : {this.props.grade.points.toFixed(2)}</h4>
              </div>
            </div>
          </CardHeader>

          <CardBody>{questionsMarkUp}</CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingGrades: state.user.fetchingGrades,
    grade: state.user.grade,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGrades: (submissionID) => dispatch(fetchGrades(submissionID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewResults);
