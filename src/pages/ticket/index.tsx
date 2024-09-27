import TicketRow from "@/components/ticket_row";
import TicketTag from "@/components/ticket_tag";
import TicketUser from "@/components/ticket_user";
import CustomButton from "@/components/custom_button";

import './ticket.css';

function Ticket() {
    return (
        <div className="flex justify-center flex-col items-center h-[85vh]">
            <section className="ticket">
                <div className="top">
                    <TicketUser area="Ti" name='Forcato' />
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
