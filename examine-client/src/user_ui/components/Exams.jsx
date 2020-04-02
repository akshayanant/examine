import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAllExams, fetchAvailableExams } from "../../redux/user/actions";
import ExamCard from "./ExamCard";
import LoadingSpinner from "./LoadingSpinner";

class Exams extends Component {
  componentDidMount() {
    this.props.fetchAllExams();
    this.props.fetchAvailableExams();
  }

  render() {
    const allExams = this.props.allExams;
    const availableExams = this.props.availableExams;
    const loadingAllExams = this.props.loadingAllExams;
    const loadingAvailableExams = this.props.loadingAvailableExams;

    const availableExamsMarkUp = loadingAvailableExams ? (
      <LoadingSpinner />
    ) : (
      availableExams.map(exam => {
        console.log(exam.examID);
        return (
          <ExamCard
            exam={exam.exam}
            key={exam.examID}
            id={exam.examID}
            available={true}
          />
        );
      })
    );
    const examsMarkUp = loadingAllExams ? (
      <LoadingSpinner />
    ) : (
      allExams.map(exam => {
        return (
          <ExamCard
            exam={exam.exam}
            key={exam.examID}
            id={exam.examID}
            available={false}
          />
        );
      })
    );

    return (
      <div>
        <div className="exams-card-container">
          <h4>Available Exams</h4>
          <div>{availableExamsMarkUp}</div>
        </div>
        <div className="exams-card-container">
          <h4>All Exams</h4>
          <div>{examsMarkUp}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allExams: state.user.allExams,
    availableExams: state.user.availableExams,
    loadingAllExams: state.user.loadingAllExams,
    loadingAvailableExams: state.user.loadingAvailableExams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllExams: () => dispatch(fetchAllExams()),
    fetchAvailableExams: () => dispatch(fetchAvailableExams())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exams);