import React, { Component } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
class exams extends Component {
  state = {
    exams: []
  };

  componentDidMount() {
    axios.get("/exams").then(res => {
      console.log(res.data);
      this.setState({
        exams: res.data
      });
    });
  }
  render() {
    let examsMarkup = this.state.exams ? (
      this.state.exams.map(exam => <p>{exam.examName}</p>)
    ) : (
      <p>Loading ... </p>
    );
    return (
      <Grid container spacing={16}>
        <Grid container justify="space-around" sm={8} xs={12}>
          <Grid item sm={4} xs={12}>
            {examsMarkup}
          </Grid>
          <Grid item sm={8} xs={12}>
            Exam
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default exams;
