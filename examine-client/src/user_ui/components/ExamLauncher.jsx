import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingSpinner from "./LoadingSpinner";
import { startExam, submitExam } from "../../redux/user/actions";
import QuestionCard from "./QuestionCard";
import { Button } from "reactstrap";
class ExamLauncher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
    this.handleSubmitExam = this.handleSubmitExam.bind(this);
  }

  componentDidMount() {
    this.props.startExam(this.props.examID);
  }

  handleClearSelection = questionID => {
    console.log("handleClearSelection");
    let answers = [...this.state.answers];
    answers = answers.filter(answer => answer.questionID != questionID);
    this.setState({ answers: answers });
  };

  handleSelection = (questionID, option) => {
    console.log(`handleSelection ${questionID}   ${option}`);
    let answers = [...this.state.answers];
    answers = answers.filter(answer => answer.questionID != questionID);
    answers.push({
      questionID: questionID,
      selection: option
    });
    this.setState({ answers: answers });
  };

  handleSubmitExam = () => {
    //this.props.submitExam(this.props.submissionID, this.state.answers);
    console.log(this.state.answers);
  };

  render() {
    let i = 1;
    const questionsMarkUP = this.props.attemptDetails.exam.questions.map(
      questionID => {
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
      <div>
        {questionsMarkUP}
        <Button href="/exams" onClick={this.handleSubmitExam}>
          Submit
        </Button>
      </div>
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
    // submitExam: (submissionID, answers) =>
    //   dispatch(submitExam(submissionID, answers))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamLauncher);
