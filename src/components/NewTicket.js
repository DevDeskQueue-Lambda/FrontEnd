import React from "react";
import { Button, Modal } from "semantic-ui-react";
import NewTicketForm from "./NewTicketForm.js";

const CreateTicket = props => {
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        trigger={
          <Button size="small" color="red">CreateTicket</Button>
        }
      >
        <Modal.Header>CreateTicket</Modal.Header>
        <Modal.Content>
          <NewTicketForm props={props} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CreateTicket;
