import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAllExams, fetchAvailableExams } from "../../redux/user/actions";

class Exams extends Component {
  componentDidMount() {
    this.props.fetchAllExams();
    this.props.fetchAvailableExams();
  }

  render() {
    const allExams = this.props.allExams;
    const examsMarkUp = allExams.map(exam => {
      return <h1>{exam.examName}</h1>;
    });
    const availableExams = this.props.availableExams;
    console.log(availableExams);
    const availableExamsMarkUp = availableExams.map(exam => {
      return <h1>{exam.examName}</h1>;
    });
    return (
      <div>
        <div className="user-pages-generic">{availableExamsMarkUp}</div>
        <div className="user-pages-generic">{examsMarkUp}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allExams: state.user.allExams,
    availableExams: state.user.availableExams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllExams: () => dispatch(fetchAllExams()),
    fetchAvailableExams: () => dispatch(fetchAvailableExams())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exams);
