import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button } from "reactstrap";

import { editExamAction } from "./../redux/admin/actions/actions";
import QuestionCard from "./../components/QuestionCard";

class editExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examID: "",
      examName: "",
      createdAt: "",
      questions: []
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
  }

  componentDidMount() {
    const { examID } = this.props.match.params;
    this.props.editExam(examID);
    axios
      .get(`/getexamdetails/${examID}`)
      .then(res => {
        console.log(res.data.exam);
        this.setState({
          ...res.data.exam,
          examID: examID
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const questionsMarkUp = this.state.questions.map(q => {
      return <QuestionCard key={q} questionID={q} />;
    });
    return (
      <div>
        <Button onClick={this.handleAddQuestion}>Add Question</Button>
        {questionsMarkUp}
      </div>
    );
  }

  handleAddQuestion = () => {
    axios
      .post("/appendquestion", {
        examID: this.state.examID,
        questionID: "9jDOO0YofZZJj5ozjA5s"
      })
      .then(res => {
        console.log(res.data);
      });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    editExam: examID => {
      dispatch(editExamAction(examID));
    }
  };
};

export default connect(null, mapDispatchToProps)(editExam);
