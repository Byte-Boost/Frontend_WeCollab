import TicketRow from "@/components/ticket_row";
import TicketTag from "@/components/ticket_tag";
import TicketUser from "@/components/ticket_user";
import CustomButton from "@/components/custom_button";
import { getTickets } from "@/scripts/http-requests/endpoints";
import { failureAlert } from "@/scripts/utils/shared";
import { useEffect, useState } from "react";
import './ticket.css';
import { Ticket } from "@/models/models";
import { getTicketById, login } from '@/scripts/http-requests/endpoints';
import { exampleTicket } from '@/samples/sampleTicket';
import TicketModal from "@/components/ticket_modal";
import NewTicketModal from "@/components/new_ticket_modal";


function TicketPage() {
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
    const [selectedTicketId, setSelectedTicketId] = useState(1);
    const closeTicketModal = () => {
        setTicketModalIsOpen(false);
    };
    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
    };

    async function getTicket(ticketId: number) {
        let ticket: Ticket = await getTicketById(ticketId);
        setSelectedTicket(ticket)
    }
    const [data, setData] = useState(Array<Ticket>);
    useEffect(()=>{
        getTicket(selectedTicketId)
    }, [selectedTicketId])
    async function getAllTickets() {
        try {
            let tickets = await getTickets()
            setData(tickets)
        } catch(error: any) {
            if(error.status === 401) {
                failureAlert("Credenciais inválidas!", `${error}`, () => {})
            }  else{
                failureAlert("Erro de Conexão", `${error}`, () => {})
            }
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTickets()
      }, [])

    return (
        <div className="flex justify-center flex-col items-center h-[85vh]">
            <section className="ticket">
                <div className="top">
                    <TicketUser area="TI" name='Forcato' />
                    <CustomButton value="Novo" onClick={()=>{setCreateModalIsOpen(true);}} name="novo"/>
                </div>
                <div>
                    {
                        data.map((ticket: Ticket) => {
                            return <TicketRow cb={()=>{setTicketModalIsOpen(true);setSelectedTicketId(Number(ticket.id))}} taskName={ticket.title} initialDate={new Date(ticket.dateOfCreation)} endDate={<TicketTag tagName={ticket.status} className="bg-[#46E964]" />} />
                        })
                    }
                </div>
            </section> 
            <NewTicketModal isOpen={createModalIsOpen} closeModal={closeCreateModal}></NewTicketModal>
            <TicketModal isOpen={ticketModalIsOpen} closeModal={closeTicketModal} ticket={selectedTicket}></TicketModal>
         </div>
    )
}

export default TicketPage;
