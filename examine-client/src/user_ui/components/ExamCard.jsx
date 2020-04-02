import React, { Component } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

class ExamCard extends Component {
  render() {
    const examName = this.props.exam.examName;
    const buttonMarkup = this.props.available ? (
      <Button>Take Exam</Button>
    ) : (
      <Button>View Results</Button>
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
