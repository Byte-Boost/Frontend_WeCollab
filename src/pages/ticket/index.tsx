import TicketUser from "@/components/ticket_user";
import CustomButton from "@/components/custom_button";
import { closeTicket, getTickets } from "@/scripts/http-requests/endpoints";
import { confirmationAlert, failureAlert } from "@/scripts/utils/shared";
import { useEffect, useState } from "react";
import './ticket.css';
import { Ticket } from "@/models/models";
import { getTicketById, login } from '@/scripts/http-requests/endpoints';
import { exampleTicket } from '@/samples/sampleTicket';
import TicketModal from "@/components/ticket_modal";
import NewTicketModal from "@/components/new_ticket_modal";
import { getSessionUser } from "@/scripts/utils/userService";
import CustomTableRow from "@/components/custom_table_row";
import CustomTableHeader from "@/components/custom_table_header";


function TicketPage() {
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
    const [selectedTicketId, setSelectedTicketId] = useState(1);
    const [user,setUser] = useState<any>()

    const closeTicketModal = () => {
        setTicketModalIsOpen(false);
        getAllTickets();
    };
    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
        getAllTickets();
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
    async function getUser(){
        let secUser = await getSessionUser()
        setUser(secUser)
    }
    useEffect(() => {
        getAllTickets()
        getUser()
      }, [])
    useEffect(() =>{
        console.log(user)
    },[user])
    useEffect(() => {
        getTicket(selectedTicketId);
    }, [selectedTicketId]);
    return (
        <div className="bg-white min-h-screen flex justify-center ">
                <section className="ticket">
                    <div className="top">
                        <TicketUser area={user?.area ?? ''} name={user?.username ?? ''} />
                        <CustomButton value="Novo" onClick={()=>{setCreateModalIsOpen(true);}} name="novo"/>
                    </div>
                    <div>
                        <table className="w-full min-w-max table-auto text-left">
                            <CustomTableHeader/>
                            <tbody>
                                {
                                    data.map((ticket: Ticket) => {
                                        return <CustomTableRow onClick={()=>{setTicketModalIsOpen(true);setSelectedTicketId(Number(ticket.id))}} date={ticket.dateOfCreation} id={ticket.id} status={ticket.status} title={ticket.title} area={ticket.area} key={ticket.id} user={ticket.requesterId} onDelete={()=>{confirmationAlert("Certeza que deseja fechar o ticket?",'closeticketopen',() => {closeTicket(ticket.id,getAllTickets)})}}/>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section> 
                <NewTicketModal isOpen={createModalIsOpen} closeModal={closeCreateModal} cb={()=>{}}></NewTicketModal>
                <TicketModal isOpen={ticketModalIsOpen} closeModal={closeTicketModal} ticket={selectedTicket} cb={getAllTickets} ></TicketModal>
            </div>
    )
}

export default TicketPage;
