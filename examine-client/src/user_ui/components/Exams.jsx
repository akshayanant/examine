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
    const loading = this.props.loading;
    const examsMarkUp = loading ? (
      <LoadingSpinner />
    ) : (
      allExams.map(exam => {
        return <ExamCard exam={exam} available={false} />;
      })
    );
    const availableExamsMarkUp = loading ? (
      <LoadingSpinner />
    ) : (
      availableExams.map(exam => {
        return <ExamCard exam={exam} available={true} />;
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
    loading: state.user.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllExams: () => dispatch(fetchAllExams()),
    fetchAvailableExams: () => dispatch(fetchAvailableExams())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exams);
