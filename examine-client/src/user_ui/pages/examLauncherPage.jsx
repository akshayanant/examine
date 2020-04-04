import React, { Component } from "react";

import ExamLauncher from "./../components/ExamLauncher";

class ExamLauncherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examID: "",
    };
  }

  componentDidMount() {
    const { examID } = this.props.match.params;
    this.setState({ examID });
  }
  render() {
    return (
      <div className="main-content-container">
        <ExamLauncher examID={this.props.match.params.examID} />
      </div>
    );
  }
}

export default ExamLauncherPage;
