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
                    <TicketRow taskName={""} initialDate={new Date} endDate={""} />
                </div>
            </section> 

            {/* <TicketRow taskName={"Trocar senhas"} initialDate={new Date()} endDate={<TicketTag tagName="ABERTO" className="bg-[#46E964] rounded-2xl text-center w-[8%]" />} /> */}
         </div>
    )
}

export default Ticket;
