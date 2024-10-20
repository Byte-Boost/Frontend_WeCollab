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
    const [filters, setFilters] = useState({
        status: "", 
        area: "", 
        userRelation: "created"
    })
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
            let tickets = await getTickets(filters, page,5)
            setData(tickets)
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
    }
    useEffect(() => {
        getAllTickets()
        getUser()
      }, [])
    useEffect(() => {
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
                <section className="ticket">
                    <div className="p-10 flex justify-between">
                        <TicketUser area={user?.area ?? ''} name={user?.username ?? ''} />
                        <CustomButton value="Novo" onClick={()=>{setCreateModalIsOpen(true);}} name="novo"/>
                    </div>

                    <div className="mx-4 flex justify-center">
                        <div className="w-[40rem] flex justify-around">
                            <select name="userRelation" id="userRelation" onChange={handleFilterChanges}>
                                <option value="created">Meus tickets</option>
                                <option value="observed">Tickets seguidos</option>
                            </select>
                            <select name="status" id="status" onChange={handleFilterChanges} defaultValue={"all"}>
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
                    <div className="flex overflow-x-auto  sm:justify-center pt-5">
                    {
                    (data.length + 1 > 5 || page > 1 ) &&
                      <Pagination
                      layout="pagination"
                      currentPage={page}
                      totalPages={1000}
                      onPageChange={onPageChange}
                      className="flex items-center space-x-2"
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
