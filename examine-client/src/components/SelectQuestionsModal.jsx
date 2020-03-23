import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Card, CardBody, FormGroup, Input } from "reactstrap";

import { setAvailableQuestions } from "../redux/admin/actions/actions";

class SelectQuestionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    let allQuetions = [];
    let availableQuestions = [];
    axios
      .get(`/getexamdetails/${this.props.examID}`)
      .then(res => {
        res.data.exam.questions.forEach(q => {
          allQuetions.push(q);
        });
        console.log(`Current Exam Questions - ${allQuetions}`);
        axios.get("/getquestionids").then(res => {
          res.data.forEach(q => {
            if (!allQuetions.includes(q)) {
              availableQuestions.push(q);
            }
          });
          console.log(`Available - ${availableQuestions}`);

          availableQuestions.forEach(questionID => {
            axios.get(`/getquestiondetails/${questionID}`).then(res => {
              console.log(res.data.question.question);
              let questions = [...this.props.availableQuestions];
              questions.push({
                id: questionID,
                question: res.data.question.question
              });
              this.props.setAvailableQuestions(questions);
            });
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const availableQuestionsMarkUp = this.props.availableQuestions.map(q => {
      return (
        <FormGroup>
          <Input
            type="checkbox"
            onChange={this.props.handleChangeSelection}
            name={q.id}
          />
          <Card key={q}>
            <CardBody>{q.question}</CardBody>
          </Card>
        </FormGroup>
      );
    });
    return <div>{availableQuestionsMarkUp}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAvailableQuestions: data => dispatch(setAvailableQuestions(data))
  };
};

const mapStateToProps = state => {
  return {
    availableQuestions: state.admin.availableQuestions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectQuestionsModal);
