import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import axios from "axios";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionID: props.questionID,
      question: {
        question: "",
        conclusion1: "",
        conclusion2: "",
        conclusion3: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        footer: "",
        points: 0,
      },
      selection: [false, false, false, false],
    };
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
  }
  componentDidMount() {
    axios.get(`/getquestiondetails/${this.props.questionID}`).then((res) => {
      console.log(res.data);
      this.setState({ question: res.data.question });
    });
  }

  handleChangeSelection(event) {
    let newSelection = [false, false, false, false];
    const option = parseInt(event.target.name);
    newSelection[option] = true;
    this.setState({ selection: newSelection });
    this.props.selection(this.state.questionID, option);
  }

  handleClearSelection() {
    let newSelection = [false, false, false, false];
    this.setState({ selection: newSelection });
    this.props.clearSelection(this.state.questionID);
  }

  render() {
    const index = this.props.index;
    const conclusionsMarkUp = (
      <div className="conclusions-markup">
        {this.state.question.conclusion1.length > 0 ? (
          <p> (1) {this.state.question.conclusion1}</p>
        ) : (
          ""
        )}

        {this.state.question.conclusion2.length > 0 ? (
          <p> (2) {this.state.question.conclusion2}</p>
        ) : (
          ""
        )}

        {this.state.question.conclusion3.length > 0 ? (
          <p> (3) {this.state.question.conclusion3}</p>
        ) : (
          ""
        )}
      </div>
    );

    const optionsMarkUp = (
      <div>
        <Form>
          <FormGroup>
            <FormGroup className="options-form-group" check>
              <Label check>
                <Input
                  type="radio"
                  name="0"
                  checked={this.state.selection[0]}
                  onChange={this.handleChangeSelection}
                />{" "}
                {this.state.question.option1}
              </Label>
            </FormGroup>
            <FormGroup className="options-form-group" check>
              <Label check>
                <Input
                  type="radio"
                  name="1"
                  checked={this.state.selection[1]}
                  onChange={this.handleChangeSelection}
                />{" "}
                {this.state.question.option2}
              </Label>
            </FormGroup>
            <FormGroup className="options-form-group" check>
              <Label check>
                <Input
                  type="radio"
                  name="2"
                  checked={this.state.selection[2]}
                  onChange={this.handleChangeSelection}
                />{" "}
                {this.state.question.option3}
              </Label>
            </FormGroup>
            <FormGroup className="options-form-group" check>
              <Label check>
                <Input
                  type="radio"
                  name="3"
                  checked={this.state.selection[3]}
                  onChange={this.handleChangeSelection}
                />{" "}
                {this.state.question.option4}
              </Label>
            </FormGroup>
          </FormGroup>
        </Form>
      </div>
    );
    return (
      <Card className="user-question-card">
        <CardHeader> Question - {index}</CardHeader>
        <CardBody>
          <CardTitle>
            {this.state.question.question}
            <p></p>
            <div>{conclusionsMarkUp}</div>
            {this.state.question.footer}
            {optionsMarkUp}
          </CardTitle>
          <Button color="success" size="sm" onClick={this.handleClearSelection}>
            clear
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default QuestionCard;
