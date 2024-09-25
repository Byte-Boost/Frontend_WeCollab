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
// const exampleTicket: Ticket = {
//   id: "1", 
//   area: "Recursos Humanos", 
//   status: "Novo", 
//   category: "suporte", 
//   title: "exemplo de um cartão", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",  
//   dateOfCreation: new Date("2024-09-25T12:22:30"), 
//   requesterId: "1"
// }

// Things needed when calling this, for when the page is ready:

// import { useRef, useState } from 'react';
// import TicketModal from '../ticket_modal';
// import { Ticket } from '@/models/models';
// const [modalIsOpen, setModalIsOpen] = useState(false);
// const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
// const closeModal = () => {
//   setModalIsOpen(false);
// };
// <AlgumElemento onClick={()=>{setModalIsOpen(true);setSelectedTicket(exampleTicket)}></AlgumElemento>
// <TicketModal isOpen={modalIsOpen} closeModal={closeModal} ticket={selectedTicket}></TicketModal>