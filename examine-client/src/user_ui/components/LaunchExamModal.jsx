import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LaunchExamModal extends Component {
  render() {
    const visible = this.props.visible;
    const examID = this.props.examID;
    return (
      <div>
        <Modal isOpen={visible}>
          <ModalHeader>You are about to start an exam. Continue?</ModalHeader>
          <ModalBody>
            <div className="launch-exam-modal-buttons">
              <Button color="success" outline onClick={this.props.cancel}>
                Cancel
              </Button>
              <Button
                color="danger"
                outline
                onClick={this.props.continue}
                href={`/launchexam/${examID}`}
              >
                Continue
              </Button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LaunchExamModal;
