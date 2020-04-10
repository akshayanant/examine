import React, { Component } from "react";
import { Card, CardHeader, CardBody, Badge } from "reactstrap";

import LoadingSpinner from "./LoadingSpinner";

class GradeCard extends Component {
  render() {
    const fetchingGrades = this.props.fetchingGrades;
    if (fetchingGrades) {
      return <LoadingSpinner />;
    }
    return (
      <Card>
        <CardHeader>
          <h4>Grade Card</h4>
        </CardHeader>
        <CardBody>
          <div className="grade-card-item">
            <Badge color="light"> Questions </Badge>
            <Badge> {this.props.totalQuestions}</Badge>
          </div>
          <div className="grade-card-item">
            <Badge color="light">Attempted </Badge>
            <Badge> {this.props.attempted}</Badge>
          </div>
          <div className="grade-card-item">
            <Badge color="light">Correct </Badge>
            <Badge>{this.props.correct}</Badge>
          </div>
          <div className="grade-card-item">
            <Badge color="light">Wrong </Badge>
            <Badge> {this.props.wrong}</Badge>
          </div>
          <div className="grade-card-item">
            <Badge color="light">Hit Rate </Badge>
            <Badge> {this.props.hitRate | 0} %</Badge>
          </div>
          <div className="grade-card-item">
            <Badge color="light"> Points </Badge>
            <Badge> {this.props.points.toFixed(2)}</Badge>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default GradeCard;
