import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingSpinner from "./LoadingSpinner";
import { startExam, submitExam } from "../../redux/user/actions";
import QuestionCard from "./QuestionCard";
import { Button, CardHeader, Card, CardBody } from "reactstrap";
import { Redirect } from "react-router-dom";
class ExamLauncher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
    this.handleSubmitExam = this.handleSubmitExam.bind(this);
  }

  componentDidMount() {
    this.props.startExam(this.props.examID);
  }

  handleClearSelection = (questionID) => {
    console.log("handleClearSelection");
    let answers = [...this.state.answers];
    answers = answers.filter((answer) => answer.questionID != questionID);
    this.setState({ answers: answers });
  };

  handleSelection = (questionID, option) => {
    console.log(`handleSelection ${questionID}   ${option}`);
    let answers = [...this.state.answers];
    answers = answers.filter((answer) => answer.questionID != questionID);
    answers.push({
      questionID: questionID,
      selection: option,
    });
    this.setState({ answers: answers });
  };

  handleSubmitExam = () => {
    this.props.submitExam(
      this.props.attemptDetails.submissionID,
      this.state.answers
    );
  };

  render() {
    let i = 1;
    const redirectMarkUp = this.props.submitted ? <Redirect to="/exams" /> : "";
    const questionsMarkUP = this.props.attemptDetails.exam.questions.map(
      (questionID) => {
        return (
          <QuestionCard
            key={questionID}
            questionID={questionID}
            index={i++}
            selection={this.handleSelection}
            clearSelection={this.handleClearSelection}
          />
        );
      }
    );
    const pageMarkUp = this.props.launchingExam ? (
      <LoadingSpinner />
    ) : (
      <Card className="exam-launcher-card">
        <CardHeader className="exam-launcher-card" color="primary">
          <div className="exam-heading">
            <h4>{this.props.attemptDetails.exam.examName}</h4>
            <div>
              <h6>Exam Duration : {this.props.attemptDetails.exam.duration}</h6>
              <h6>Total points : {this.props.attemptDetails.exam.points}</h6>
            </div>
          </div>
        </CardHeader>

        <CardBody>{questionsMarkUP}</CardBody>
        <Button onClick={this.handleSubmitExam}>Submit</Button>
      </Card>
    );
    return (
      <div>
        {pageMarkUp}
        {redirectMarkUp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    launchingExam: state.user.startingExam,
    attemptDetails: state.user.attemptDetails,
    submittingExam: state.user.submittingExam,
    submitted: state.user.submitted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startExam: (examID) => dispatch(startExam(examID)),
    submitExam: (submissionID, answers) =>
      dispatch(submitExam(submissionID, answers)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamLauncher);
