import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  editExamAction,
  selectQuestionsAction,
  submitSelectQuestions,
  cancelSelectQuestions
} from "./../redux/admin/actions/actions";

import QuestionCard from "./../components/QuestionCard";
import SelectQuestionsModal from "./../components/SelectQuestionsModal";

class editExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examID: "",
      examName: "",
      createdAt: "",
      questions: [],
      selected: []
    };
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
  }

  handleAddQuestion = event => {
    this.props.openModal();
    event.preventDefault();
  };

  handleCancel = () => {
    this.props.cancel();
  };

  handleSubmit = () => {
    this.props.submit();
    this.state.selected.forEach(questionID => {
      axios
        .post("/appendquestion", {
          questionID: questionID,
          examID: this.state.examID
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    });
  };

  handleChangeSelection = event => {
    const target = event.target;
    const questionID = target.name;
    const checked = target.checked;
    let selected = [...this.state.selected];
    if (checked && !selected.includes(questionID)) {
      selected.push(questionID);
      this.setState({ selected });
    } else if (!checked && selected.includes(questionID)) {
      selected = selected.filter(id => {
        return questionID != id;
      });
      this.setState({ selected });
    }
    console.log(this.state.selected);
  };

  componentDidMount() {
    const { examID } = this.props.match.params;
    this.props.editExam(examID);
    axios
      .get(`/getexamdetails/${examID}`)
      .then(res => {
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
        <Modal isOpen={this.props.modalVisible}>
          <ModalHeader>Available Questions</ModalHeader>
          <ModalBody>
            <SelectQuestionsModal
              examID={this.state.examID}
              handleChangeSelection={this.handleChangeSelection}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {questionsMarkUp}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editExam: examID => {
      dispatch(editExamAction(examID));
    },
    openModal: () => {
      dispatch(selectQuestionsAction());
    },
    submit: () => {
      dispatch(submitSelectQuestions());
    },
    cancel: () => {
      dispatch(cancelSelectQuestions());
    }
  };
};

const mapStateToProps = state => {
  return {
    modalVisible: state.admin.questionsModal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editExam);
