import React, { Component } from "react";
import { Card, CardHeader, CardBody, Badge } from "reactstrap";
import { Redirect } from "react-router-dom";

class Timer extends Component {
  state = {
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;
    const color = minutes < 2 ? "danger" : "light";
    const minuteString = minutes < 10 ? `0${minutes}` : minutes;
    const minutesMarkUp = (
      <h4>
        <Badge color={color}>{minuteString}</Badge>
      </h4>
    );
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;
    const secondsMarkUp = (
      <h4>
        <Badge color={color}>{secondsString}</Badge>
      </h4>
    );
    return (
      <div>
        {minutes === 0 && seconds === 0 ? (
          <Redirect to={this.props.redirect} />
        ) : (
          <Card>
            <CardHeader>Time Remaining</CardHeader>
            <CardBody className="timer-body">
              {minutesMarkUp} :{secondsMarkUp}
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default Timer;
