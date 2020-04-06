import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import Question from "./../components/question";
class questions extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    axios.get("/questions").then((res) => {
      this.setState({
        questions: res.data,
      });
    });
  }
  render() {
    let questionsMarkup = this.state.questions ? (
      this.state.questions.map((question) => (
        <Question key={question.id} question={question.question} />
      ))
    ) : (
      <p>Loading ... </p>
    );
    return (
      <div className="questions-container">
        <div className="add-question-button">
          <Button component={Link} href="/admin/addquestion">
            Add Question
          </Button>
        </div>
        <div>{questionsMarkup}</div>
      </div>
    );
  }
}

export default questions;
