import './card.css'
import { use, useEffect, useState } from 'react';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import { closeTicket, getAreas, getCommentsByTicketId, getUsers, postComment, switchObserver } from '@/scripts/http-requests/endpoints';
import { Area, Ticket, TicketComment, User } from '@/models/models';
import CategoryIcon from '../../icons/category';
import { Label, Textarea, TextInput } from 'flowbite-react';
import CustomSelect from '../../CustomElements/custom_select';
import { Autocomplete, TextField } from '@mui/material';
import ActivityBoard from '../../ActivityBoard/activity_board';

function TicketCard({closeModal, ticket,uponPost}: {closeModal: any, ticket: Ticket,uponPost? : Function}){
    const [commentsOnTicket, setCommentsOnTicket] = useState<Array<TicketComment>>([]);
    const [commentValue, setCommentValue] = useState<string|null>(null);
    const [selectedObservers, setSelectedObservers] = useState<Array<{id: string, name: string}>>([]);
    const [selectedArea, setSelectedArea] = useState<string>("");
    const [areas, setAreas] = useState<Array<Area>>([]);
    const [inputUsers, setInputUsers] = useState<Array<User>>([]);
    const [inputValueUsers, setInputValueUsers] = useState<string>("");
    const [forwarding, setForwarding] = useState<boolean>(false);
    
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
    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setSelectedArea(value);
    };
    async function forwardTicket(id: number){
        if (selectedArea == "") {
            failureAlert("Erro!", "Selecione uma área para encaminhar o ticket", () => {})
            return;
        } 
        if (selectedObservers.length == 0) {
            failureAlert("Erro!", "Adicione um observador para encaminhar o ticket", () => {})
            return;
        }
        await switchObserver(ticket.id, selectedArea, selectedObservers.map(x=>Number(x.id))).then((data) => {
            successAlert("Ticket encaminhado!", `Ticket ${ticket.id} encaminhado`, () => {
                closeModal();
            });
        }).catch((error) => {
            failureAlert("Erro!", "Erro ao encaminhar ticket", () => {})
        });
    }
    
    

    useEffect(() => {
        getAreas({}).then((data) => {
            setAreas(data);
        });
    }, [])
    
    useEffect(() => {
        getUsers({startsWith: inputValueUsers}, 1, 5)
        .then(function(response){
            setInputUsers(response.rows);
        })
        .catch(error => {
            failureAlert("Error fetching users", "An error occurred while fetching users", () => {});
        })
    }, [inputValueUsers]);

    return(
        <div className="relative w-full min-w-[50rem] max-w-[60rem] max-h-full z-50">
            {/* FORWARDING CARD */}
            <div className={'absolute z-50 left-0 top-0 rounded h-full w-full flex justify-center items-center'+(forwarding?"":" hidden")}  onClick={()=>{
                setForwarding(false);
            }}>
                <div className="bg-[#fefefe] h-[20rem] w-[40rem] rounded-2xl shadow-2xl border-black border" onClick={(e)=>{e.stopPropagation()}}>
                    
                    
                    
                    <div className="flex flex-col gap-2 p-4">
                        <h1 className="text-[1.2rem] font-bold text-center underline border">Encaminhar Ticket</h1>
                        <div className="w-full">
                            <div className="flex flex-row justify-between gap-8">
                                <CustomSelect labelName="Area" value={selectedArea || ""} name="area" inputClassName="border-gray-300 bg-gray-50 border-2 rounded-lg shadow-inner" containerClassName="w-[14rem]" onChange={handleAreaChange} options={areas} defaultValue="Selecione uma carreira"/>
                                
                                <div className='w-[18rem] flex flex-col static grow'>
                                    <label htmlFor="selectObserver" className='text-[0.75rem] relative font-[700] top-[0.5rem] w-fit bg-white ml-[10px] px-[10px]'>Adicionar observador</label>
                                    <Autocomplete
                                        className='w-full p-[4px] h-[2.9em] text-[1rem] border-gray-300 bg-gray-50 border-2 rounded-lg shadow-inner noOutlineAutocomplete'
                                        id="selectObserver"
                                        filterOptions={(x) => x}
                                        freeSolo
                                        autoHighlight
                                        clearOnEscape
                                        
                                        options={inputUsers}
                                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name ?? ''}
                                        onChange={(e, newValue: any) => {
                                            if (newValue !== null && typeof newValue == 'object') {
                                                if (!selectedObservers.find(x=>x.id==newValue.id)){
                                                    setSelectedObservers([...selectedObservers, newValue]);
                                                }
                                            }
                                        }}

                                        onInputChange={(e, newInputValue) => {
                                            setInputValueUsers(newInputValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size="small" />}
                                        noOptionsText="Nenhum cliente encontrado"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        

                        <div className='min-w-[12rem] flex flex-col static'>
                            <p className='text-[0.75rem] relative font-[700] h-[1rem] w-fit bg-white'></p>

                            <p id="par" className="noScrollbar w-full p-[4px] h-[7.5rem] text-[1rem] border-gray-300 bg-gray-50 border-2 rounded-lg shadow-inner overflow-y-scroll flex gap-2 flex-col items-start">

                                {
                                    selectedObservers.map((observer, i) => {
                                        return (
                                            <span key={i} className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-200 rounded">
                                                {observer.name}
                                                <button type="button" className="inline-flex items-center p-1 ms-2 text-sm text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900" aria-label="Remove" onClick={()=>{
                                                    setSelectedObservers(selectedObservers.filter(x=>x.id!=observer.id))
                                                }}>
                                                    <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                    <span className="sr-only">Remove badge</span>
                                                </button>
                                            </span>
                                        )
                                    })
                                }

                            </p>
                        </div>
                        
                        <div className='w-full flex justify-around'>
                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2" onClick={()=>{
                                setForwarding(false);
                            }}>
                                Cancelar
                            </button>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2" onClick={()=>{
                                forwardTicket(Number(ticket.id))
                            }}>
                                <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 21">
                                    <path d="M8.0001 10.1308C9.61344 8.97671 11.4547 8.57075 13 8.57075V6.22616C13 5.26817 13 4.78917 13.2952 4.65662C13.5903 4.52407 13.9484 4.8423 14.6644 5.47875L18.6367 9.00968C20.2053 10.404 20.9896 11.1012 20.9896 11.9993C20.9896 12.8975 20.2053 13.5946 18.6367 14.989L14.6644 18.5199C13.9484 19.1563 13.5903 19.4746 13.2952 19.342C13 19.2095 13 18.7305 13 17.7725V15.4279C9.4 15.4279 5.5 17.1422 4 19.9993C4 17.5676 4.37726 15.621 5.0001 14.0735"/>
                                </svg>
                                Encaminhar
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            <div className={"relative bg-white rounded-lg shadow overflow-y-scroll max-h-[32rem]"+(forwarding?" opacity-50":"")}>
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
                        <ActivityBoard/>
                    </p>
                </div>

                {/* CARD BUTTONS */}
                <div className="p-4 md:p-3 flex justify-around">
                    <button data-modal-hide="default-modal" type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>{
                        setForwarding(true);
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