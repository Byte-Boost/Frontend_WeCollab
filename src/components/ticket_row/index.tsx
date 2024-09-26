import BoxTicketIcon from "../icons/box-ticket";

interface TicketRow {
    taskName: string;
    initialDate: Date;
    endDate: Date | string
}

function TicketRow() {
    return (
        <div>
            <BoxTicketIcon />
        </div>
    );
}

export default TicketRow;