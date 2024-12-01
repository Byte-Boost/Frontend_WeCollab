import CustomButton from "@/components/CustomElements/custom_button";
import CustomCheckbox from "@/components/CustomElements/custom_checkbox";
import CustomInput from "@/components/CustomElements/custom_input";
import CustomSelect from "@/components/CustomElements/custom_select";
import { Area, Role, User } from "@/models/models";
import { getAreas, getRoles, register } from "@/scripts/http-requests/endpoints";
import { formatCPF } from "@/scripts/utils/dataFormatter";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { Card } from "flowbite-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

function RegisterPage() {
    const emptyUser: User = {
        name: '',
        cpf: '',
        area: null,
        username: '',
        password: '',
        role: "",
        admin: false
    };
    
    const [user, setUser] = useState<User>(emptyUser);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const buttonRef = useRef(null);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (name === "passwordconfirm") {
            setPasswordConfirm(value);
        }
        else {
            setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
        }
    };

    const validateInputs = () => {
        const emptyFields = [];
        for (const [key, value] of Object.entries(user)) {
            if (value === '' || value === null) {
                emptyFields.push(key);
            }
        }
        return emptyFields;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        user.cpf = user.cpf.replace(/[^[^\w\s]/gi, ''); // I call this a crime but i still did it.
        
        const emptyFields = validateInputs();
        if (emptyFields.length > 0) {
            failureAlert("Alguns campos estão vazios", `Campos vazios: ${emptyFields.join(', ')}`, () => {});
            return;
        }
        if (user.password !== passwordConfirm) {
            failureAlert("Senhas não coincidem", "A senha e a confirmação de senha devem ser iguais.", () => {});
            return;
        }
        try {
            await register(user).then(function(response) {
                successAlert('Usuario Registrado com sucesso', user.toString());
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
    const updateAdminInput = (value: boolean) => {
        setUser({ ...user, "admin": value });
    }

    const [areas, setAreas] = useState<Array<Area>>([]);
    useEffect(() => {
        getAreas({}).then((data) => {
            setAreas(data);
        });
    }, [])
    const [roles, setRoles] = useState<Array<Role>>([]);
    useEffect(() => {
        if (user.area !== null){
            getRoles({area: user.area}).then((data) => {
                setRoles(data);
            });
            setUser({...user, role: ""});
        }
    }, [user.area])

    return (
        <div className="mt-4 h-[85vh] flex justify-center items-center">
            
            <Head>
                <title>Registrar Usuario - WeCollab</title>
            </Head>
            <div className='min-h-[85vh] min-w-full flex justify-center items-center'>
                <div className="text-center">
                    <Card className="p-4 border-2">
                        <h1 className="text-5xl pt-5 font-mono">Cadastro de Usuários</h1>
                        <div className="text-center">
                        <form action="" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <CustomInput labelName="Nome Completo" name="name" type="text" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} />
                                    </div>

                                    <div className="flex">
                                        <CustomInput labelName="Nome de Usuario" name="username" type="text" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} />
                                    </div>

                                    <div className="flex">
                                        <CustomInput labelName="CPF" value={formatCPF(user.cpf)} name="cpf" type="text" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} maxLenght={14} />
                                    </div>


                                    <div className="flex flex-row gap-5">
                                        <CustomInput labelName="Senha" name="password" type="password" inputClassName="border-[#000]" onChange={handleChange} />
                                        <CustomInput labelName="Confirme a Senha" name="passwordconfirm" type="password" inputClassName="border-[#000]" onChange={handleChange} />
                                    </div>

                                    <div className="flex flex-row gap-5">
                                        <CustomSelect labelName="Carreira" value={user.area || ""} name="area" inputClassName="border-[#000]" onChange={handleChange} options={areas} defaultValue="Selecione uma carreira"/>
                                        <CustomSelect labelName="Cargo" value={user.role || ""} name="role" inputClassName="border-[#000]" onChange={handleChange} options={roles} defaultValue="Selecione um cargo"/>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row gap-5">
                                    <CustomCheckbox label="Administrador" name="admin" cb={updateAdminInput}></CustomCheckbox>
                                    <CustomButton ref={buttonRef} name="Cadastrar" value="Cadastrar" className="m-5" />
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;