import { User } from "@/models/models";
import { editUser } from "@/scripts/http-requests/endpoints";
import { failureAlert } from "@/scripts/utils/shared";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import CustomSelect from "../custom_select";

interface UserCardProps {
    closeModal: any
    cb: Function
    user: User
}

function UserCard({ closeModal, user, cb }: UserCardProps) {
    
    async function tryCb() {
        try {
            if(user.id != undefined) {
                const newUser: User = {...user, name: nameValue.toString(), area: areaValue.toString(), admin: adminValue !== null? true : false, role: roleValue.toString()}
                await editUser(user.id, newUser)
                console.log(newUser)
                cb? cb(): null;
                //name, area, roleId, admin
            }
        } catch(error: any) {
            if(error.status === 401) {
                failureAlert("Algo deu errado!", `Something went wrong`, () => {})
            }
        }
    }

    const [nameValue, setNameValue] = useState<String>("");
    const [areaValue, setAreaValue] = useState<String>("");
    const [adminValue, setAdminValue] = useState<boolean | null>(null);
    const [roleValue, setRoleValue] = useState<String>("");
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setNameValue(value);
        console.log(nameValue)
    };
    const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setAreaValue(value);
        console.log(areaValue)
    };
    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setRoleValue(value);
        console.log(roleValue)
    };
    const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        value === "True" ? setAdminValue(true) : setAdminValue(false);
        console.log(adminValue)
    };

    return (
        <div className="relative p-4 w-full min-w-[50rem] max-w-[60rem] max-h-full z-50">
            <div className="relative bg-white rounded-lg shadow overflow-y-scroll max-h-[32rem]  ">
                <header className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Editar Usuário
                    </h3>

                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </header>
                <div className="p-4 md:p-5">
                    <p className="text-base leading-relaxed text-gray-500">
                        <Label htmlFor="cpf" value="CPF:" className="font-bold" />
                        <div className="border-2 rounded-lg shadow-inner">
                            <TextInput id="cpf" type="text" name="cpf" required disabled placeholder={user.cpf}/>
                        </div>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        <Label htmlFor="name" value="Nome:" className="font-bold" />
                        <div className="border-2 rounded-lg shadow-inner">
                            <TextInput id="name" type="text" name="name" required placeholder={user.name} onChange={handleNameChange}/>
                        </div>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        <Label htmlFor="area" value="Área:" className="font-bold" />
                        <div className="border-2 rounded-lg shadow-inner">
                            <TextInput id="area" type="text" name="area" required placeholder={user.area?user.area:""} onChange={handleAreaChange} />
                        </div>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        <Label htmlFor="role" value="Role:" className="font-bold" />
                        <div>
                            <CustomSelect name="role" value="role" options={[{name: roleValue}, {name: "Manager"}, {name: "User"}]} onChange={handleRoleChange}/>
                        </div>
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        <Label htmlFor="admin" value="Admin:" className="font-bold" />
                        <div>
                            <CustomSelect name="admin" value="admin" options={[{name: adminValue ? "True" : "False"}, {name: "False"}, {name: "True"}]} onChange={handleAdminChange}/>
                        </div>
                    </p>

                    <footer className="p-4 md:p-5 border-t border-gray-300 rounded-b">
                    <div className="flex items-center justify-center mt-4">
                        <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>{
                            if(nameValue !== "" && areaValue !== "" && adminValue !== null && roleValue !== "") {
                                tryCb()
                                closeModal()
                            }
                        }}>Editar</button>
                    </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default UserCard;