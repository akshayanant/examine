import React, { Component } from "react";
import {
  FormGroup,
  InputLabel,
  Button,
  TextareaAutosize
} from "@material-ui/core";

import { Link } from "react-router-dom";
import axios from "axios";

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      concl1: "",
      concl2: "",
      concl3: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: 0,
      grade: 0.0
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleConcl1Change = this.handleConcl1Change.bind(this);
    this.handleConcl2Change = this.handleConcl2Change.bind(this);
    this.handleConcl3Change = this.handleConcl3Change.bind(this);
    this.handleOption1Change = this.handleOption1Change.bind(this);
    this.handleOption2Change = this.handleOption2Change.bind(this);
    this.handleOption3Change = this.handleOption3Change.bind(this);
    this.handleOption4Change = this.handleOption4Change.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleQuestionChange = event => {
    this.setState({ question: event.target.value });
  };
  handleConcl1Change = event => {
    this.setState({ concl1: event.target.value });
  };
  handleConcl2Change = event => {
    this.setState({ concl2: event.target.value });
  };
  handleConcl3Change = event => {
    this.setState({ concl3: event.target.value });
  };
  handleOption1Change = event => {
    this.setState({ option1: event.target.value });
  };
  handleOption2Change = event => {
    this.setState({ option2: event.target.value });
  };
  handleOption3Change = event => {
    this.setState({ option3: event.target.value });
  };
  handleOption4Change = event => {
    this.setState({ option4: event.target.value });
  };
  handleAnswerChange = event => {
    this.setState({ answer: event.target.value });
  };
  handleGradeChange = event => {
    this.setState({ grade: event.target.value });
  };

  handleSubmit = event => {
    axios
      .post("/addquestion", this.state)
      .then(() => {
        this.setState({
          question: "",
          concl1: "",
          concl2: "",
          concl3: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: 0,
          grade: 0.0
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCancel = event => {
    this.setState({
      question: "",
      concl1: "",
      concl2: "",
      concl3: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: 0,
      grade: 0.0
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className="add-question-form">
        <FormGroup className="add-question-form">
          <InputLabel>Question</InputLabel>
          <TextareaAutosize
            onChange={this.handleQuestionChange}
            rows="4"
            value={this.state.question}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Conclusion 1</InputLabel>
          <TextareaAutosize
            onChange={this.handleConcl1Change}
            value={this.state.concl1}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Conclusion 2</InputLabel>
          <TextareaAutosize
            onChange={this.handleConcl2Change}
            value={this.state.concl2}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Conclusion 3</InputLabel>
          <TextareaAutosize
            onChange={this.handleConcl3Change}
            value={this.state.concl3}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Option 1</InputLabel>
          <TextareaAutosize
            onChange={this.handleOption1Change}
            value={this.state.option1}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Option 2</InputLabel>
          <TextareaAutosize
            onChange={this.handleOption2Change}
            value={this.state.option2}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Option 3</InputLabel>
          <TextareaAutosize
            value={this.state.option3}
            onChange={this.handleOption3Change}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Option 4</InputLabel>
          <TextareaAutosize
            value={this.state.option4}
            onChange={this.handleOption4Change}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Answer</InputLabel>
          <TextareaAutosize
            value={this.state.answer}
            onChange={this.handleAnswerChange}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <InputLabel>Grade</InputLabel>
          <TextareaAutosize
            value={this.state.grade}
            onChange={this.handleGradeChange}
          />
        </FormGroup>
        <Button component={Link} to="/questions">
          exit
        </Button>
        <Button onClick={this.handleCancel} color="secondary">
          clear all
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          submit
        </Button>
      </div>
    );
  }
}

export default AddQuestion;
