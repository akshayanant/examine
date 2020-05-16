import React, { Component } from "react";
import { FormGroup, Label, Button, Input } from "reactstrap";

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
      footer: "",
      answer: 0,
      grade: 0.0,
      explanation: "",
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleConcl1Change = this.handleConcl1Change.bind(this);
    this.handleConcl2Change = this.handleConcl2Change.bind(this);
    this.handleConcl3Change = this.handleConcl3Change.bind(this);
    this.handleOption1Change = this.handleOption1Change.bind(this);
    this.handleOption2Change = this.handleOption2Change.bind(this);
    this.handleOption3Change = this.handleOption3Change.bind(this);
    this.handleOption4Change = this.handleOption4Change.bind(this);
    this.handleFooterChange = this.handleFooterChange.bind(this);
    this.handleExplanationChange = this.handleExplanationChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleQuestionChange = (event) => {
    this.setState({ question: event.target.value });
  };
  handleConcl1Change = (event) => {
    this.setState({ concl1: event.target.value });
  };
  handleConcl2Change = (event) => {
    this.setState({ concl2: event.target.value });
  };
  handleConcl3Change = (event) => {
    this.setState({ concl3: event.target.value });
  };
  handleOption1Change = (event) => {
    this.setState({ option1: event.target.value });
  };
  handleOption2Change = (event) => {
    this.setState({ option2: event.target.value });
  };
  handleOption3Change = (event) => {
    this.setState({ option3: event.target.value });
  };
  handleOption4Change = (event) => {
    this.setState({ option4: event.target.value });
  };

  handleFooterChange = (event) => {
    this.setState({ footer: event.target.value });
  };

  handleExplanationChange = (event) => {
    this.setState({ explanation: event.target.value });
  };

  handleAnswerChange = (event) => {
    this.setState({ answer: parseInt(event.target.value) });
  };
  handleGradeChange = (event) => {
    this.setState({ grade: parseInt(event.target.value) });
  };

  handleSubmit = (event) => {
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
          footer: "",
          answer: 0,
          grade: 0.0,
          explanation: "",
        });
      })
      .catch((err) => {});
  };

  handleCancel = (event) => {
    this.setState({
      question: "",
      concl1: "",
      concl2: "",
      concl3: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      footer: "",
      answer: 0,
      grade: 0.0,
      explanation: "",
    });
  };

  render() {
    return (
      <div className="add-question-form">
        <FormGroup className="add-question-form">
          <Label>Question</Label>
          <Input
            type="textarea"
            onChange={this.handleQuestionChange}
            rows="10"
            value={this.state.question}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Conclusion 1</Label>
          <Input
            type="textarea"
            onChange={this.handleConcl1Change}
            value={this.state.concl1}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Conclusion 2</Label>
          <Input
            type="textarea"
            onChange={this.handleConcl2Change}
            value={this.state.concl2}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Conclusion 3</Label>
          <Input
            type="textarea"
            onChange={this.handleConcl3Change}
            value={this.state.concl3}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Option 1</Label>
          <Input
            type="textarea"
            onChange={this.handleOption1Change}
            value={this.state.option1}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Option 2</Label>
          <Input
            type="textarea"
            onChange={this.handleOption2Change}
            value={this.state.option2}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Option 3</Label>
          <Input
            type="textarea"
            value={this.state.option3}
            onChange={this.handleOption3Change}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Option 4</Label>
          <Input
            type="textarea"
            value={this.state.option4}
            onChange={this.handleOption4Change}
          />
        </FormGroup>

        <FormGroup className="add-question-form">
          <Label>Footer</Label>
          <Input
            type="textarea"
            value={this.state.footer}
            onChange={this.handleFooterChange}
          />
        </FormGroup>

        <FormGroup className="add-question-form">
          <Label>Explanation</Label>
          <Input
            type="textarea"
            value={this.state.explanation}
            onChange={this.handleExplanationChange}
          />
        </FormGroup>

        <FormGroup className="add-question-form">
          <Label>Answer</Label>
          <Input
            type="number"
            value={this.state.answer}
            onChange={this.handleAnswerChange}
          />
        </FormGroup>
        <FormGroup className="add-question-form">
          <Label>Point</Label>
          <Input
            type="number"
            value={this.state.grade}
            onChange={this.handleGradeChange}
          />
        </FormGroup>
        <div className="add-question-buttons">
          <Button outline color="danger" component={Link} href="/questions">
            Exit
          </Button>
          <Button outline color="warning" onClick={this.handleCancel}>
            clear all
          </Button>
          <Button outline color="success" onClick={this.handleSubmit}>
            submit
          </Button>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
