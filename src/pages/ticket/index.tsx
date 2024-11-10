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
import Head from 'next/head';
import { useEffect, useState } from "react";
import './ticket.css';
import CustomPagination from "@/components/custom_pagination";

function TicketPage() {
    const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(exampleTicket);
    const [selectedTicketId, setSelectedTicketId] = useState(1);
    const [filters, setFilters] = useState({
        status: "", 
        area: "", 
        userRelation: "created"
    })
    const [user,setUser] = useState<any>()
    const [totalPages, setTotalPages] = useState(0)
    const [page,setPage] = useState(1)
    
    const closeTicketModal = () => {
        setTicketModalIsOpen(false);
        getAllTickets();
    };
    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
        getAllTickets();
    };
    const handleFilterChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
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
            let pageLimit = 5;
            let ticketsQuery = await getTickets(filters, page, pageLimit)
            let totalEntries = ticketsQuery.count
            let tickets = ticketsQuery.rows
            setData(tickets)
            setTotalPages(Math.ceil(totalEntries/pageLimit))
            return tickets;
        } catch(error: any) {
            if(error.status === 401) {
                failureAlert("Credenciais inválidas!", `${error}`, () => {})
            }  else{
                failureAlert("Erro de Conexão", `${error}`, () => {})
            }
            console.log(error)
            return null;
        }
    }
    async function getUser(){
        let secUser = await getSessionUser()
        setUser(secUser)
        console.log(secUser)
    }
    useEffect(() => {
        getUser()
        getAllTickets()
      }, [])
    useEffect(() => {
        setPage(1);
        getAllTickets()
    },[filters]);
    useEffect(() => {
        getAllTickets().then((newTickets)=>{
            if(newTickets && newTickets.length === 0 && page > 1){
                setPage(page-1)
            }
        })
    },[page]);
    
    useEffect(() => {
        getTicket(selectedTicketId);
    }, [selectedTicketId]);

    const onPageChange = (page: number) => setPage(page);

    return (
        <div className="bg-white min-h-screen flex justify-center">
                <Head>
                    <title>Lista de Tickets - WeCollab</title>
                </Head>
                <section className="ticket">
                    <div className="p-6 m-4 flex justify-between bg-[#f4f4f4] rounded-2xl">
                        <TicketUser area={user?.area ?? ''} name={user?.username ?? ''} />
                        <CustomButton value="Novo" onClick={()=>{setCreateModalIsOpen(true);}} name="novo"/>
                    </div>

                    <div className="mx-4 flex justify-center mt-2">
                        <div className="w-[40rem] flex justify-around">
                            <select name="userRelation" id="userRelation" onChange={handleFilterChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[12rem]">
                                <option value="created">Meus tickets</option>
                                <option value="observed">Tickets seguidos</option>
                                { user?.admin && <option value="all">Todos os tickets</option>}
                            </select>
                            <select name="status" id="status" onChange={handleFilterChanges} defaultValue={"all"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[12rem]">
                                <option value="open">Abertos</option>
                                <option value="closed">Fechados</option>
                                <option value="all">Todos</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <table className="w-full min-w-max table-auto text-left">
                            <CustomTableHeader/>
                            <tbody>
                                {
                                    data.map((ticket: Ticket) => {
                                        return <CustomTableRow onClick={()=>{setTicketModalIsOpen(true);setSelectedTicketId(Number(ticket.id))}} date={ticket.dateOfCreation} id={ticket.id} status={ticket.status} title={ticket.title} owner={ticket.Owner.name} area={ticket.area} key={ticket.id} user={ticket.requesterId} onDelete={()=>{confirmationAlert("Certeza que deseja fechar o ticket?",'closeticketopen',() => {closeTicket(ticket.id,getAllTickets)})}}/>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex overflow-x-auto sm:justify-center py-5">
                    
                    {
                    (data.length + 1 > 5 || page > 1 ) &&
                        <CustomPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={onPageChange} 
                        />
                      
                    }
                   
                    </div>
                   
                </section> 
                <NewTicketModal isOpen={createModalIsOpen} closeModal={closeCreateModal} cb={()=>{}}></NewTicketModal>
                <TicketModal isOpen={ticketModalIsOpen} closeModal={closeTicketModal} ticket={selectedTicket} cb={getAllTickets} ></TicketModal>
            </div>
    )
}

export default TicketPage;
