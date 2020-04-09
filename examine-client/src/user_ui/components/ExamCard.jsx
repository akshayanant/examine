import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

import LaunchExamModal from "./LaunchExamModal";

class ExamCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      examID: "",
    };
    this.handleContinue = this.handleContinue.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTakeExam = this.handleTakeExam.bind(this);
  }

  componentDidMount() {
    this.setState({ examID: this.props.id });
  }

  handleContinue = () => {
    this.setState({ modalVisible: false });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleTakeExam = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    const examName = this.props.exam.examName;
    const buttonMarkup = this.props.available ? (
      <div>
        <Button onClick={this.handleTakeExam}>Take Exam</Button>
        <LaunchExamModal
          visible={this.state.modalVisible}
          continue={this.handleContinue}
          cancel={this.handleCancel}
          examID={this.state.examID}
        />
      </div>
    ) : (
      <Button href={`/viewresults/${this.props.submissionID}`}>
        View Results
      </Button>
    );
    return (
      <div className="exam-card">
        <Card>
          <CardHeader> {examName}</CardHeader>
          <CardBody>{buttonMarkup}</CardBody>
        </Card>
      </div>
    );
  }
}

export default ExamCard;
