import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAvailableExams, fetchPastExams } from "../../redux/user/actions";
import ExamCard from "./ExamCard";
import LoadingSpinner from "./LoadingSpinner";
import { CardHeader } from "reactstrap";

class Exams extends Component {
  componentDidMount() {
    this.props.fetchPastExams();
    this.props.fetchAvailableExams();
  }

  render() {
    const pastExams = this.props.pastExams;
    const availableExams = this.props.availableExams;
    const loadingPastExams = this.props.loadingPastExams;
    const loadingAvailableExams = this.props.loadingAvailableExams;
    const availableExamsMarkUp = loadingAvailableExams ? (
      <LoadingSpinner />
    ) : availableExams.length === 0 ? (
      <CardHeader>
        <h6> No exams available right now. Stay tuned!</h6>
      </CardHeader>
    ) : (
      availableExams.map((exam) => {
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
    const pastExamsMarkUp = loadingPastExams ? (
      <LoadingSpinner />
    ) : pastExams.length === 0 ? (
      <CardHeader>
        <h6> No past exams found. Please take an exam when avaiable!</h6>
      </CardHeader>
    ) : (
      pastExams.map((exam) => {
        return (
          <ExamCard
            exam={exam.exam}
            key={exam.examID}
            id={exam.examID}
            available={false}
            submissionID={exam.submissionID}
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
          <h4>Past Exams</h4>
          <div>{pastExamsMarkUp}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pastExams: state.user.pastExams,
    availableExams: state.user.availableExams,
    loadingPastExams: state.user.loadingPastExams,
    loadingAvailableExams: state.user.loadingAvailableExams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPastExams: () => dispatch(fetchPastExams()),
    fetchAvailableExams: () => dispatch(fetchAvailableExams()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exams);
