import React, { Component } from "react";
import axios from "axios";

import Exam from "./../components/exam";

class exams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      active: []
    };
  }

  componentDidMount() {
    axios.get("/exams").then(res => {
      this.setState({
        exams: res.data
      });
    });
    axios.get("/activeexams").then(res => {
      console.log(res.data);
      this.setState({
        active: res.data
      });
    });
  }

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
  console.log(examID);
  axios
    .post("/launchexam", { examID })
    .then(res => {
      console.log("Launch Success!");
    })
    .catch(err => {
      console.log(err);
    });
};

const handleDisableExam = examID => {
  console.log(examID);
  axios
    .post("/disableexam", { examID })
    .then(res => {
      console.log(res);
      console.log("Disable Success!");
    })
    .catch(err => {
      console.log(err);
    });
};

export default exams;
