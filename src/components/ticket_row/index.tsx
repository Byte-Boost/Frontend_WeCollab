import BoxTicketIcon from "../icons/box_ticket";
import TicketTag from "../ticket_tag";
import "./row.css"

interface TicketRow {
    className?: string;
    taskName: string;
    initialDate: Date;
    endDate: string | JSX.Element
    cb: Function;
}

function TicketRow(TicketRow: TicketRow) {
    return (
        <section className="row" onClick={()=>{TicketRow.cb()}}>
            <div className="i">
                <BoxTicketIcon />
                <span>{TicketRow.taskName}</span>
            </div>
            <div className="i tags">
                <TicketTag tagName="ESPERA" className="bg-[#FF860E]"/>
                <TicketTag tagName="TI" className="bg-[#000]"/>
            </div>
            <div className="i right">
                <span>{TicketRow.initialDate.toLocaleDateString()}</span>
                <span>{TicketRow.endDate}</span>
            </div>
        </section>
    );
}

export default TicketRow;