import React from "react";

import TicketCard from "../ticket_card";
import { Modal } from "flowbite-react";
import { TicketModalProps } from "@/models/models";

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, closeModal, ticket ,cb}) => {
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
      <Modal.Body>
        <TicketCard closeModal={closeModal} ticket={ticket} uponPost={cb} />
      </Modal.Body>
    </Modal>
  );
};

export default TicketModal;