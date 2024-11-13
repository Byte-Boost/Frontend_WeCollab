import './card.css'
import { useEffect, useState } from 'react';
import CategoryIcon from '../../icons/category';
import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import { Area, CreateTicket, Ticket, User } from '@/models/models';
import { getAreas, getUsers, postTicket } from '@/scripts/http-requests/endpoints';
import { failureAlert, successAlert } from '@/scripts/utils/shared';
import CustomSelect from '../../CustomElements/custom_select';
import { Autocomplete, TextField } from '@mui/material';
import { twMerge } from 'tailwind-merge';

function NewTicketCard({closeModal}: {closeModal: any}){
    const emptyTicket: CreateTicket = {
        title: "",
        description: "",
        area: "",
        observers: []
    }
    const [selectedObservers, setSelectedObservers] = useState<Array<{id: string, name: string}>>([]);
    const [ticketValue, setTicketValue] = useState<CreateTicket>(emptyTicket);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setTicketValue({ ...ticketValue, [name]: value });
    };  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        try {
            if (ticketValue.observers.length > 0){ 
                postTicket(ticketValue).then((r)=>{
                    successAlert("Ticket criado com sucesso!", "Seu ticket foi criado com sucesso!");
                    closeModal();
                });
            }else{
                failureAlert("Nenhum observador adicionado", "Adicione pelo menos um observador para criar um ticket");
                return;
            }

        } catch {
            failureAlert("Algo deu errado!", "Seu ticket não foi criado, tente novamente!");
        }
    }

    const [areas, setAreas] = useState<Array<Area>>([]);
    const [inputUsers, setInputUsers] = useState<Array<User>>([]);
    const [inputValueUsers, setInputValueUsers] = useState<string>("");
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

    useEffect(() => {
        console.log(selectedObservers);
        setTicketValue({...ticketValue, observers: selectedObservers.map(x=>x.id)});
    }, [selectedObservers]);

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
                    <div className="flex gap-4">
                        <div className="w-[32rem]">
                            <div>
                                <Label htmlFor="titulo" value="Titulo:" className="font-bold" />
                                <div className="border-2 rounded-lg shadow-inner">
                                    <TextInput id="titulo" type="text" name="title" required onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <CustomSelect labelName="Area" value={ticketValue.area || ""} name="area" inputClassName="border-gray-300 bg-gray-50 border-2 rounded-lg shadow-inner" containerClassName="w-[12rem]" onChange={handleChange} options={areas} defaultValue="Selecione uma carreira"/>
                                
                                <div className='w-[18rem] flex flex-col static'>
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