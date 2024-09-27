import TicketIcon from "../icons/ticket"; 
import './user.css'

interface TicketUser{
    name: string
    area: string
}

function TicketUser(TicketUser: TicketUser){
    return(
        <>
        <section className="user">
            <div className="geraldiv">
                <div className="icon"></div>
                <div className="txtDiv">
                    <h1>Tickets enviados por {TicketUser.name}</h1>

                    <h3>{TicketUser.area}</h3>
                </div>
            </div>
        </section>
        </>
    )
}
export default TicketUser;