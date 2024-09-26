import React from "react";

import TicketCard from "../ticket_card";
import { Modal } from "flowbite-react";
import { ModalProps } from "@/models/models";

const UploadModal: React.FC<ModalProps> = ({ isOpen, closeModal, ticket }) => {
  return (
    <Modal show={isOpen} onClose={closeModal} dismissible className="bg-black bg-opacity-30 grid place-content-center" size={"lg"}>
      <Modal.Body>
        <TicketCard closeModal={closeModal} ticket={ticket}/>
      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;


// SOMETHING USEFUL:
// Things needed when calling this, for when the page is ready:

// import { useRef, useState } from 'react';
// import TicketModal from '../ticket_modal';
// import { Ticket } from '@/models/models';

// const [modalIsOpen, setModalIsOpen] = useState(false);
// const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
// const [selectedTicketId, setSelectedTicketId] = useState(1);
// const closeModal = () => {
// setModalIsOpen(false);
// };
// async function getTicket(ticketId: number) {
//     let ticket: Ticket = await getTicketById(ticketId);
//     setSelectedTicket(ticket)
//     console.log(ticket);
// }
// useEffect(()=>{
//     getTicket(selectedTicketId)
// }, [selectedTicketId])

// onClick={()=>{setModalIsOpen(true);setSelectedTicketId(1)}}
// <TicketModal isOpen={modalIsOpen} closeModal={closeModal} ticket={selectedTicket}></TicketModal>