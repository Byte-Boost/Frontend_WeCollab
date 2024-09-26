import TicketIcon from "../icons/ticket"; 
import './user.css'

interface TicketUser{
    name: string
}

function TicketUser(name: string){
    return(
        <>
        <section className="user">
            <div>
                <TicketIcon/>
                <h1>Tickets enviados por {name}</h1>
            </div>
            <h3></h3>
        </section>
        </>
    )
}
export default TicketUser;