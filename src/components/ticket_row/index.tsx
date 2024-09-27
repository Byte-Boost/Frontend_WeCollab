import BoxTicketIcon from "../icons/box_ticket";
import TicketTag from "../ticket_tag";
import "./row.css"

interface TicketRow {
    className?: string;
    taskName: string;
    initialDate: Date;
    endDate: string | JSX.Element
}

function TicketRow(TicketRow: TicketRow) {
    return (
        <div className="row_Ticket">
            <BoxTicketIcon />
            <span>{TicketRow.taskName}</span>
            <TicketTag tagName="ESPERA" className="bg-[#FF860E] rounded-2xl text-center w-[8%]" />
            <TicketTag tagName="TI" className="bg-[#000] rounded-2xl text-center w-[8%]" />
            <span>{TicketRow.initialDate.toLocaleDateString()}</span>
            <span>{TicketRow.endDate}</span>
        </div>
    );
}

export default TicketRow;