import React, { Component } from "react";

import FinishExam from "../components/FinishExam";
import { auth } from "../util/auth";
import { Redirect } from "react-router-dom";

class FinishExamPage extends Component {
  componentDidMount() {}
  render() {
    const valid = auth(localStorage.tokenID);
    if (!valid) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <FinishExam submissionID={this.props.match.params.submissionID} />
      </div>
    );
  }
}

export default FinishExamPage;
