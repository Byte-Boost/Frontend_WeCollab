import CustomButton from "@/components/custom_button";
import CustomTableHeader from "@/components/custom_table_header";
import CustomTableRow from "@/components/custom_table_row";
import NewTicketModal from "@/components/new_ticket_modal";
import TicketModal from "@/components/ticket_modal";
import TicketUser from "@/components/ticket_user";
import { Ticket } from "@/models/models";
import { exampleTicket } from '@/samples/sampleTicket';
import { closeTicket, getTicketById, getTickets } from "@/scripts/http-requests/endpoints";
import { confirmationAlert, failureAlert } from "@/scripts/utils/shared";
import { getSessionUser } from "@/scripts/utils/userService";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import './ticket.css';
function TicketPage() {
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
    const [selectedTicketId, setSelectedTicketId] = useState(1);
    const [user,setUser] = useState<any>()
    const [page,setPage] = useState(1)
    
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
            let tickets = await getTickets(page,5)
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
    useEffect(() => {
        getAllTickets()
        },[page]);
    
    useEffect(() =>{
        console.log(user)
    },[user])
    useEffect(() => {
        getTicket(selectedTicketId);
    }, [selectedTicketId]);

    const onPageChange = (page: number) => setPage(page);

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
                    <div className="flex overflow-x-auto  sm:justify-center pt-5">
                   
                    <Pagination
                        layout="pagination"
                        currentPage={page}
                        totalPages={1000}
                        onPageChange={onPageChange}
                        showIcons
                        className="flex items-center space-x-2"
                         >
                            <button className="w-12 h-12 flex items-center justify-center">Previous</button>
                            <button className="w-12 h-12 flex items-center justify-center">1</button>
                            <button className="w-12 h-12 flex items-center justify-center">2</button>
                            <button className="w-12 h-12 flex items-center justify-center">3</button>
                            <button className="w-12 h-12 flex items-center justify-center">4</button>
                            <button className="w-12 h-12 flex items-center justify-center">Next</button>
                    </Pagination>
                </div>
                   
                </section> 
                <NewTicketModal isOpen={createModalIsOpen} closeModal={closeCreateModal} cb={()=>{}}></NewTicketModal>
                <TicketModal isOpen={ticketModalIsOpen} closeModal={closeTicketModal} ticket={selectedTicket} cb={getAllTickets} ></TicketModal>
            </div>
    )
}

export default TicketPage;
