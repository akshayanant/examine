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
            <h6 className="grade-card-item-text">Questions</h6>{" "}
            <Badge>
              {" "}
              <h6> {this.props.totalQuestions}</h6>
            </Badge>
          </div>
          <div className="grade-card-item">
            <h6 className="grade-card-item-text">Attempted </h6>
            <Badge>
              {" "}
              <h6> {this.props.attempted} </h6>{" "}
            </Badge>
          </div>
          <div className="grade-card-item">
            <h6 className="grade-card-item-text">Correct </h6>
            <Badge>
              {" "}
              <h6> {this.props.correct}</h6>{" "}
            </Badge>
          </div>
          <div className="grade-card-item">
            <h6 className="grade-card-item-text">Wrong </h6>
            <Badge>
              <h6> {this.props.wrong} </h6>{" "}
            </Badge>
          </div>
          <div className="grade-card-item">
            <h6 className="grade-card-item-text">Hit Rate </h6>
            <Badge>
              <h6> {this.props.hitRate | 0} % </h6>{" "}
            </Badge>
          </div>
          <div className="grade-card-item">
            <h6 className="grade-card-item-text"> Points </h6>
            <Badge>
              <h6>{this.props.points.toFixed(2)} </h6>{" "}
            </Badge>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default GradeCard;
