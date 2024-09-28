import './card.css'
import { useEffect, useState } from 'react';
import CategoryIcon from '../icons/category';
import { Label, Textarea, TextInput } from 'flowbite-react';
import { Ticket } from '@/models/models';
import { postTicket } from '@/scripts/http-requests/endpoints';
import { failureAlert, successAlert } from '@/scripts/utils/shared';

function NewTicketCard({closeModal}: {closeModal: any}){
    const emptyTicket: Ticket = {
        id: "",
        title: "",
        description: "",
        category: "",
        status: "",
        dateOfCreation: new Date(),
        area: "",
        requesterId: "",
    }
    const [ticketValue, setTicketValue] = useState<Ticket>(emptyTicket);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setTicketValue({ ...ticketValue, [name]: value });
    };  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        try {
            postTicket(ticketValue).then((r)=>{
                successAlert("Ticket criado com sucesso!", "Seu ticket foi criado com sucesso!");
                closeModal();
            });
        } catch {
            failureAlert("Algo deu errado!", "Seu ticket não foi criado, tente novamente!");
        }
    }

    return(
        <div className="relative p-4 w-full max-w-2xl max-h-full z-50 min-w-[50rem]">
            <div className="relative bg-white rounded-lg shadow overflow-y-scroll max-h-[32rem]  ">
                {/* CARD HEADER */}
                <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Criar um novo Ticket
                    </h3>

                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </header>

                {/* CARD BODY */}
                <form className="flex flex-col p-4 md:p-5 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-4">
                        <div className='grow'>
                            <Label htmlFor="area" value="Área:" className="font-bold" />
                            <div className="border-2 rounded-lg shadow-inner">
                                <TextInput id="area" type="text" name="area" required onChange={handleChange} />
                            </div>
                        </div>
                        
                        <div className='grow'>
                            <Label htmlFor="categoria" value="Categoria:" className="font-bold" />
                            <div className="border-2 rounded-lg shadow-inner">
                                <TextInput id="categoria" type="text" name="category" required onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="titulo" value="Titulo:" className="font-bold" />
                        <div className="border-2 rounded-lg shadow-inner">
                            <TextInput id="titulo" type="text" name="title" required onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div>
                        <Label htmlFor="descricao" value="Descrição:" className="font-bold" />
                        <div className="border-2 rounded-lg shadow-inner">
                            <Textarea id="descricao" rows={4} name="description" required onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4 w-full' type="submit">Postar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTicketCard;