import TicketRow from "@/components/ticket_row";
import TicketTag from "@/components/ticket_tag";
import TicketUser from "@/components/ticket_user";
import CustomButton from "@/components/custom_button";
import { getTickets } from "@/scripts/http-requests/endpoints";
import { failureAlert } from "@/scripts/utils/shared";
import { useEffect, useState } from "react";
import './ticket.css';

function Ticket() {
    const [data, setData] = useState([]);

    async function getAllTickets() {
        try {
            let tickets = await getTickets()
            console.log(tickets)
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
                    <CustomButton value="Novo" onClick={function(){}} name="novo"/>
                </div>
                <div>
                    <TicketRow taskName={"Trocar Senhas de Acesso ao Banco"} initialDate={new Date} endDate={"28/09/2024"} />
                    <TicketRow taskName={"asd"} initialDate={new Date()} endDate={<TicketTag tagName="ABERTO" className="bg-[#46E964]" />} /> 
                </div>
            </section> 

         </div>
    )
}

export default Ticket;
