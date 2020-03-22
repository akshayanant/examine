import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import signin from "./../pages/signin";
import Navbar from "./navbar";
import exams from "./../pages/exams";
import questions from "./../pages/questions";
import addQuestion from "./../pages/addQuestion";
import editExam from "./../pages/editExam";

class Container extends Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Navbar></Navbar>
          <div className="container">
            <Switch>
              <Route exact path="/" component={exams} />
              <Route exact path="/signin" component={signin} />
              <Route exact path="/exams" component={exams} />
              <Route exact path="/questions" component={questions} />
              <Route exact path="/addquestion" component={addQuestion} />
              <Route exact path="/editexam/:examID" component={editExam} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    editExamID: state.admin.editingExamID
  };
};

export default connect(mapStateToProps, null)(Container);
