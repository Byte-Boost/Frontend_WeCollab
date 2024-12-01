import { getSelf } from '@/scripts/http-requests/endpoints';
import './user.css'
import { useEffect, useState } from 'react';

interface TicketUser{
    name: string
    area: string
}

function TicketUser(props: TicketUser){
    const [userPfp, setUserPfp] = useState('');
    useEffect(()=>{
        getSelf().then(function(response) {
            setUserPfp(response.pfp);
        });
    }, [])
    return(
        <>
        <section className="user">
            <div className="geraldiv md:grid md:grid-flow-row  ">
                {   userPfp?
                    <img src={userPfp} className="w-[4.5rem] h-[4.5rem] rounded-lg text-center content-center object-cover"/>
                    :<div className="bg-black w-[4.5rem] h-[4.5rem] rounded-lg text-white text-center content-center font-mono">{props.name[0]? props.name[0].toUpperCase() : 'DMY'}</div>
                }
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