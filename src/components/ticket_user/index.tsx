import TicketIcon from "../icons/ticket"; 
import './user.css'

interface TicketUser{
    name: string
    area: string
}

function TicketUser(props: TicketUser){
    return(
        <>
        <section className="user">
            <div className="geraldiv md:grid md:grid-flow-row  ">
                <div className="icon text-center content-center text-white font-mono max-md:hidden">{props.name[0]? props.name[0].toUpperCase() : 'DMY' }</div>
                <div className="txtDiv">
                    <h1>Tickets - {props.name? props.name.replace(/^./, props.name[0].toUpperCase()) : 'Dummy' }</h1>
                    <h3>{props.area? props.area: ""}</h3>
                </div>
            </div>
        </section>
        </>
    )
}
export default TicketUser;