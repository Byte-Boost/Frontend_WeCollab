import { Area, Role, User } from "@/models/models";
import { editUser, getAreas, getRoles } from "@/scripts/http-requests/endpoints";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import CustomSelect from "../custom_select";
import CustomInput from "../custom_input";
import CustomCheckbox from "../custom_checkbox";
import CustomButton from "../custom_button";
import './users.css';
import { formatCPF } from "@/scripts/utils/dataFormatter";

interface UserCardProps {
    closeModal: any
    cb: Function
    user: User
}

function UserCard({ closeModal, user, cb }: UserCardProps) {
    const emptyUser: User = {
        name: '',
        cpf: '',
        area: null,
        username: '',
        password: '',
        role: "",
        admin: false
    };
    const [newUser, setNewUser] = useState<User>(emptyUser);

    const validateInputs = () => {
        const emptyFields = [];
        for (const [key, value] of Object.entries(newUser)) {
            if (value === '' || value === null) {
                emptyFields.push(key);
            }
        }
        return emptyFields;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const emptyFields = validateInputs();

        if (emptyFields.length > 0) {
            failureAlert("Alguns campos estão vazios", `Campos vazios: ${emptyFields.join(', ')}`, () => {});
            return;
        }
        try {
            // console.log(newUser.role, newUser.area, newUser.name, newUser.admin)
            await editUser(user.id?user.id:"", newUser).then(function(response) {
                successAlert('Usuario Registrado com sucesso', user.toString());
                closeModal();
            });
        } catch (error: any) {
            if (error.status === 403) {
                failureAlert("Sem Autorização", `${error}`, () => {});
            } else {
                failureAlert( `Erro ${error.status}`, `${error}`, () => {});
            }
            console.log(error);
        }
    };

    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };
    const [areas, setAreas] = useState<Array<Area>>([]);
    useEffect(() => {
        setNewUser(user);
        getAreas({}).then((data) => {
            setAreas(data);
        });
    }, [])
    const [roles, setRoles] = useState<Array<Role>>([]);
    useEffect(() => {
        if (newUser.area !== null){
            getRoles({area: newUser.area}).then((data) => {
                setRoles(data);
            });
            setNewUser({...newUser, role: ""});
        }
    }, [newUser.area])

    return (
        <div className="relative p-4 w-full min-w-[50rem] max-w-[60rem] max-h-full z-50">
            <div className="relative bg-white rounded-lg shadow overflow-y-scroll max-h-[36rem] text-center noScrollbar">
                <Card className="p-4 border-2 flex flex-col items-center justify-center">
                        <h1 className="text-5xl pt-5 font-mono">Editar Usuário</h1>
                        <div className="text-center">
                        <form onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <CustomInput disabled={true} labelName="CPF" value={formatCPF(newUser.cpf) || ""} name="cpf" type="text" inputClassName="border-gray-400" containerClassName="w-[41.2rem]" onChange={handleChange} maxLenght={14} />
                                    </div>

                                    <div className="flex">
                                        <CustomInput labelName="Nome Completo" value={newUser.name || ""} name="name" type="text" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} />
                                    </div>

                                    <div className="flex">
                                        <CustomInput labelName="Nome de Usuario" value={newUser.username || ""} name="username" type="text" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} />
                                    </div>


                                    <div className="flex flex-row gap-5">
                                        <CustomSelect labelName="Carreira" value={newUser.area || ""} name="area" inputClassName="border-[#000]" onChange={handleChange} options={areas} defaultValue="Selecione uma carreira"/>
                                        <CustomSelect labelName="Cargo" value={newUser.role || ""} name="role" inputClassName="border-[#000]" onChange={handleChange} options={roles} defaultValue="Selecione um cargo"/>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row gap-5">
                                    <CustomCheckbox label="Administrador" name="admin" defaultChecked={user.admin} cb={(check:any)=>{
                                        setNewUser({...newUser, admin: check})
                                    }}></CustomCheckbox>
                                    <CustomButton name="Editar" value="Atualizar usuário" className="m-5" />
                                </div>
                            </form>
                        </div>
                    </Card>

            </div>
        </div>
    );
};

export default UserCard;