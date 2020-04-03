import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

import Exam from "./../components/exam";
import {
  createExamModal,
  cancelCreateExamModal,
  submitCreateExamModal
} from "../redux/admin/actions/actions";

class exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: undefined,
      active: undefined,
      newExamName: ""
    };
    this.handleExamNameChange = this.handleExamNameChange.bind(this);
    this.handleCreateExam = this.handleCreateExam.bind(this);
    this.handleCreateExamCancel = this.handleCreateExamCancel.bind(this);
    this.handleCreateExamSubmit = this.handleCreateExamSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/exams").then(res => {
      this.setState({
        exams: res.data
      });
    });
    axios.get("/activeexams").then(res => {
      this.setState({
        active: res.data
      });
    });
  }

  handleExamNameChange = event => {
    this.setState({ newExamName: event.target.value });
  };

  handleCreateExam = () => {
    this.props.createExam();
  };

  handleCreateExamSubmit = () => {
    axios
      .post("/createexam", { examName: this.state.newExamName })
      .then(res => {})
      .catch(err => {});
    this.props.submitCreateExam();
  };

  handleCreateExamCancel = () => {
    this.props.cancelCreateExam();
  };

  render() {
    let examsMarkup = this.state.exams ? (
      this.state.exams.map(exam => (
        <Exam
          key={exam.examID}
          examID={exam.examID}
          exam={exam.exam}
          launch={handleLaunchExam}
        />
      ))
    ) : (
      <p>Loading ... </p>
    );
    let activeExamsMarkUp = this.state.active ? (
      this.state.active.map(exam => (
        <Exam
          key={exam.examID}
          activeID={exam.examID}
          exam={exam.exam}
          disable={handleDisableExam}
        />
      ))
    ) : (
      <p>Loading ... </p>
    );

    return (
      <div>
        <Button onClick={this.handleCreateExam}>Create Exam</Button>
        <Modal isOpen={this.props.createExamModal}>
          <ModalHeader>Name of the Exam</ModalHeader>
          <ModalBody>
            <Input onChange={this.handleExamNameChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleCreateExamSubmit}>
              Create
            </Button>{" "}
            <Button color="secondary" onClick={this.handleCreateExamCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div>
          <h4>Available Exams</h4>
          <div>{activeExamsMarkUp}</div>
        </div>
        <div>
          <h4>All Exams</h4>
          <div>{examsMarkup}</div>
        </div>
      </div>
    );
  }
}

const handleLaunchExam = examID => {
  axios
    .post("/launchexam", { examID })
    .then(res => {})
    .catch(err => {});
};

const handleDisableExam = examID => {
  axios
    .post("/disableexam", { examID })
    .then(res => {})
    .catch(err => {});
};

const mapStateToProps = state => {
  return {
    createExamModal: state.admin.createExamModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createExam: () => {
      dispatch(createExamModal());
    },
    cancelCreateExam: () => {
      dispatch(cancelCreateExamModal());
    },
    submitCreateExam: () => {
      dispatch(submitCreateExamModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(exams);
