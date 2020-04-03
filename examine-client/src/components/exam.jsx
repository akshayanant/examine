import React, { Component } from "react";
import { Card, CardTitle, Button } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";

class Exam extends Component {
  render() {
    const exam = this.props.exam;
    const button = this.props.examID ? (
      <div>
        <Button
          href={`/admin/editexam/${this.props.examID}`}
          outline
          color="success"
          className="mr-3"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            this.props.launch(this.props.examID);
          }}
          outline
          color="danger"
        >
          Launch
        </Button>
      </div>
    ) : (
      <Button
        onClick={() => {
          this.props.disable(this.props.activeID);
        }}
      >
        Disable
      </Button>
    );
    return (
      <div>
        <Card body>
          <CardTitle className="exam-card-title">
            <h3>{exam.examName}</h3>
            <div>{button}</div>
          </CardTitle>
        </Card>
      </div>
    );
  }
}

export default connect(null, null)(Exam);
