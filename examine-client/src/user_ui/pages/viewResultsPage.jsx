import React, { Component } from "react";

import ViewResults from "./../components/ViewResults";

class ViewResultsPage extends Component {
  render() {
    return <ViewResults submissionID={this.props.match.params.submissionID} />;
  }
}

export default ViewResultsPage;
