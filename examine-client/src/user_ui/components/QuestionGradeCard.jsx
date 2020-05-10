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
  Badge,
} from "reactstrap";
import axios from "axios";

class QuestionGradeCard extends Component {
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
        questionFooter: "",
        points: 0,
      },
      selection: [false, false, false, false],
    };
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
    this.handleClearSelection = this.handleClearSelection.bind(this);
  }
  componentDidMount() {
    axios.get(`/getquestiondetails/${this.props.questionID}`).then((res) => {
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
    let conclusionsMarkUp = "";
    if (this.state.question.conclusion1.length > 0) {
      conclusionsMarkUp = (
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
    }
    let classNames = [
      "options-form-group",
      "options-form-group",
      "options-form-group",
      "options-form-group",
    ];
    classNames[this.props.correctAnswer] = "options-form-group-correct-answer";

    let selection = [false, false, false, false];
    if (this.props.userSelection != -1) {
      selection[this.props.userSelection] = true;
    }

    let resultMarkUp = (
      <h3>
        <Badge size="lg" color="light">
          No Attempt
        </Badge>
      </h3>
    );
    if (this.props.userSelection != -1) {
      resultMarkUp =
        this.props.point > 0 ? (
          <h3>
            <Badge color="success" size="lg">
              Correct!
            </Badge>
          </h3>
        ) : (
          <h3>
            <Badge color="danger" size="lg">
              Wrong
            </Badge>
          </h3>
        );
    }

    const optionsMarkUp = (
      <div>
        <Form>
          <FormGroup>
            <FormGroup className={classNames[0]} check disabled>
              <Label check>
                <Input type="radio" name="0" checked={selection[0]} />{" "}
                {this.state.question.option1}
              </Label>
            </FormGroup>
            <FormGroup className={classNames[1]} check disabled>
              <Label check>
                <Input type="radio" name="1" checked={selection[1]} />{" "}
                {this.state.question.option2}
              </Label>
            </FormGroup>
            <FormGroup className={classNames[2]} check disabled>
              <Label check>
                <Input type="radio" name="2" checked={selection[2]} />{" "}
                {this.state.question.option3}
              </Label>
            </FormGroup>
            <FormGroup className={classNames[3]} check disabled>
              <Label check>
                <Input type="radio" name="3" checked={selection[3]} />{" "}
                {this.state.question.option4}
              </Label>
            </FormGroup>
          </FormGroup>
        </Form>
      </div>
    );
    return (
      <Card className="user-question-card">
        <CardHeader>
          <div className="question-grade-card-heading">
            <h6>Question : {index}</h6>
            <h6>Point : {this.props.point.toFixed(2)}</h6>
          </div>
        </CardHeader>
        <CardBody>
          <CardTitle>
            <div className="conclusions-markup">
              {this.state.question.question}
            </div>
            {conclusionsMarkUp}
            <div className="conclusions-markup">
              {this.state.question.footer}
            </div>
            {optionsMarkUp}
          </CardTitle>
          {resultMarkUp}
        </CardBody>
      </Card>
    );
  }
}

export default QuestionGradeCard;
