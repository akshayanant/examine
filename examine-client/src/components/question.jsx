import React, { Component } from "react";
import { Card, CardText, Button } from "reactstrap";

class Question extends Component {
  render() {
    const question = this.props.question;
    return (
      <div className="question-card">
        <Card body>
          <CardText>{question}</CardText>
        </Card>
      </div>
    );
  }
}

export default Question;
