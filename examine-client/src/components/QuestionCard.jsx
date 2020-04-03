import React, { Component } from "react";
import { Card, CardText, Input, Label, FormGroup, Form } from "reactstrap";
import axios from "axios";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: "",
      question: "",
      conclusion1: "",
      conclusion2: "",
      conclusion3: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      grade: ""
    };
  }
  componentDidMount() {
    const questionID = this.props.questionID;
    axios
      .get(`/getquestiondetails/${questionID}`)
      .then(res => {
        this.setState(res.data.question);
      })
      .catch(err => {});
  }

  render() {
    const conslusionsMarkUp = this.state.conclusion1 ? (
      <div>
        <p>(1) {this.state.conclusion1}</p>
        <p>(2) {this.state.conclusion2}</p>
        <p>(3) {this.state.conclusion3}</p>
      </div>
    ) : (
      ""
    );

    return (
      <Card>
        <p>{this.state.question}</p>
        <div>
          {conslusionsMarkUp}
          <Form>
            <FormGroup>
              <Label>
                <Input type="radio" name="radio1" id="exampleSelect" />
                {this.state.option1}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="radio" name="radio1" id="exampleSelect" />
                {this.state.option2}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="radio" name="radio1" id="exampleSelect" />
                {this.state.option3}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <Input type="radio" name="radio1" id="exampleSelect" />
                {this.state.option4}
              </Label>
            </FormGroup>
          </Form>
        </div>
      </Card>
    );
  }
}

export default QuestionCard;
