import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import home from "./pages/home";
import signin from "./pages/signin";
import Navbar from "./components/navbar";
import exams from "./pages/exams";
import questions from "./pages/questions";
import addQuestion from "./pages/addQuestion";

function App() {
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
