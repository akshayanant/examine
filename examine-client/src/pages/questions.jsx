import React, { Component } from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
class questions extends Component {
  state = {
    questions: []
  };

  componentDidMount() {
    axios.get("/questions").then(res => {
      console.log(res.data);
      this.setState({
        questions: res.data
      });
    });
  }
  render() {
    let questionsMarkup = this.state.questions ? (
      this.state.questions.map(question => (
        <div>
          <p>{question.question}</p>
          <p>{question.createdAt}</p>
        </div>
      ))
    ) : (
      <p>Loading ... </p>
    );
    return (
      <Grid container spacing={16}>
        <Grid container justify="space-around" sm={8} xs={12}>
          <Button color="inherit" component={Link} to="/addquestion">
            Add Question
          </Button>
          <Grid item sm={4} xs={12}>
            {questionsMarkup}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default questions;
