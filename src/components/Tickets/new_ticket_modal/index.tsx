import React from "react";

import { Modal } from "flowbite-react";
import { ModalProps } from "@/models/models";
import NewTicketCard from "../new_ticket_card";

const NewTicketModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
      <Modal.Body>
        <NewTicketCard closeModal={closeModal}/>
      </Modal.Body>
    </Modal>
  );
};

export default NewTicketModal;