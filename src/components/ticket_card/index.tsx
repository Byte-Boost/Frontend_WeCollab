import './card.css'
import { useEffect, useState } from 'react';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { closeTicket, getCommentsByTicketId, postComment } from '@/scripts/http-requests/endpoints';
import { Ticket, TicketComment } from '@/models/models';
import CategoryIcon from '../icons/category';
import { Textarea } from 'flowbite-react';

function TicketCard({closeModal, ticket,uponPost}: {closeModal: any, ticket: Ticket,uponPost? : Function}){
    const [commentsOnTicket, setCommentsOnTicket] = useState<Array<TicketComment>>([]);
    const [commentValue, setCommentValue] = useState<string|null>(null);
    
    async function getComments(ticketId: number) {
        let comments: Array<TicketComment> = await getCommentsByTicketId(ticketId);
        setCommentsOnTicket(comments);
    }
    useEffect(()=>{
        getComments(Number(ticket.id))
    }, [ticket])
    
    async function tryCommenting() {
        if(commentValue !== undefined) {
            const comment = commentValue || "";
            try {
                await postComment(comment, ticket.id)
                uponPost? uponPost(): null;
                getComments(Number(ticket.id));
            } catch(error: any) {
                if(error.status === 401) {
                    failureAlert("Algo deu errado!", `Something went wrong`, () => {})
                }
            }
        }
    }  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setCommentValue(value);
    };
    
    return(
        <div className="relative p-4 w-full min-w-[50rem] max-w-[60rem] max-h-full z-50">
            <div className="relative bg-white rounded-lg shadow overflow-y-scroll max-h-[32rem]  ">
                {/* CARD HEADER */}
                <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900">
                        <div className="text-sm text-black flex items-center text-ellipsis ">
                            <CategoryIcon/>
                            { ticket.status === "Novo" ? 
                                <div className="justify-end">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Novo</span>
                                </div>
                                : ticket.status === "Em andamento" ?
                                    <div className="justify-end">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Em Andamento</span>
                                    </div>
                                : ticket.status === "Concluído" ?
                                    <div className="justify-end">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Concluído</span>
                                    </div>
                                
                                : null
                            } 
                        </div>
                        {ticket.id} - {ticket.title}
                    </h3>

                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </header>

                {/* CARD BODY */}                
                <div className="p-4 md:p-5 space-y-4">
                    <div className='flex justify-start items-center'>    
                        <div className="text-sm grow text-black flex items-center w-[12rem] truncate md:overflow-clip ">
                            <CategoryIcon/><p><b>Owner: </b>{ticket.Owner.name}</p>
                        </div>
                        <div className="text-sm grow text-black  flex items-center w-[13rem] truncate">
                            <CategoryIcon/><p><b>Encarregados: </b>{ticket.Observers[0]?ticket.Observers[0].User.name:""}</p> 
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-5 text-center">
                    <p className="text-base leading-relaxed text-gray-500">
                        {ticket.description}
                    </p>
                </div>

                {/* CARD BUTTON */}
                <div className="p-4 md:p-3 flex justify-around">
                    <button data-modal-hide="default-modal" type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>{
                        // codigo para atribuir tarefa    
                        }}>Atribuir tarefa</button>
                    <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={async ()=>{
                        await closeTicket(ticket.id)
                        successAlert("Tarefa finalizada!", `Tarefa ${ticket.id} finalizada com sucesso!`, () => {
                            closeModal()
                        })
                        }}>Finalizar ticket</button>
                </div>
                
                {/* CARD FOOTER */}
                <footer className="p-4 md:p-5 border-t border-gray-300 rounded-b">
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 font-medium text-gray-900 text-lg">Comentários</label>
                        <Textarea id="description" onChange={handleChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Adicione um comentário"></Textarea>               
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>{
                            tryCommenting()
                        }}>Postar</button>
                    </div> 
                    {
                        commentsOnTicket.toReversed().map((comment, index) => {
                            return (
                                <div className="bg-gray-200 mt-4 p-2.5 w-full rounded-lg border" key={index}>
                                    <div className="flex gap-2">
                                        <div className="bg-black w-8 h-8 rounded-lg text-white text-center content-center font-mono">{comment.User.name[0].toUpperCase()}</div>
                                        <span className="text-md">{comment.User.name}</span>
                                        <span className="text-md grow text-end">{(new Date(comment.date)).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-900 break-words">{comment.content}</p>
                                </div>
                            )
                        })
                    }
                </footer>

            </div>
        </div>
    )
}

export default TicketCard;