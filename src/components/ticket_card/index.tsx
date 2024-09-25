import { useRef } from 'react';
import { failureAlert } from '@/scripts/utils/shared';
import { postComment } from '@/scripts/http-requests/api';
import { Ticket } from '@/models/models';

function TicketCard({closeModal, ticket}: {closeModal: any, ticket: Ticket}){
    const writeCommentRef = useRef<HTMLInputElement | null>(null);

    async function tryCommenting() {
        if(writeCommentRef.current?.value !== undefined) {
            const comment = writeCommentRef.current?.value;
            console.log(comment,ticket.id)
            try {
                await postComment(comment, ticket.id)
            } catch(error: any) {
                if(error.status === 401) {
                    failureAlert("Algo deu errado!", `Something went wrong`, () => {})
                }
            }
        }
    }    

    return(
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                
                <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                        {ticket.category}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{ticket.id} - {ticket.title}</div>
                    <p className="text-gray-700 text-base">{ticket.description}</p>
                </div>
                
                <hr></hr>

                <div className="flex items-center coolinput">
                    <label htmlFor="input" className="text">Comment</label>
                    <input type="text"  name="input" className="input" ref={writeCommentRef}/>
                </div>
                <button className='mt-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={tryCommenting}>
                    Post
                </button>
                    
                    {/* aqui entrará a sessão de comentários de cada ticket, utilizando um data.map */}

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
                    Fechar
                </button>
            </div>
        </div>
    )
}

export default TicketCard;