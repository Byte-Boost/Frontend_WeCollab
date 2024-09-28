import CustomButton from "@/components/custom_button";
import CustomInput from "@/components/custom_input";
import { User } from "@/models/models";
import { register } from "@/scripts/http-requests/endpoints";
import { formatCPF } from "@/scripts/utils/dataFormatter";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { useRef, useState } from "react";

function RegisterPage() {
    const emptyUser: User = {
        name: '',
        cpf: '',
        area: null,
        username: '',
        password: '',
        role: "User",
        admin: false
    };
    
    const [user, setUser] = useState<User>(emptyUser);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const buttonRef = useRef(null);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        switch (type) {
            case 'checkbox':
                setUser({ ...user, [name]: checked });
                break;
            default:
                if (name === "passwordconfirm") {
                    setPasswordConfirm(value);
                }
                else {
                    setUser((prevUser) => ({
                    ...prevUser,
                    [name]: value
                }));
                }
                break;
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

    return (
        <div className="mt-4 h-[85vh] flex justify-center items-center">
            <div className='bg-white min-h-[85vh] min-w-full flex justify-center items-center'>
                <div className="text-center">
                    <h1 className="text-5xl pt-5 font-mono">Cadastro de Usuários</h1>
                    <div className="text-center">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-5">
                                    <CustomInput labelName="Nome Completo" name="name" type="text" inputClassName="border-[#000] border-[3.5px]" onChange={handleChange} />
                                    <CustomInput labelName="Nome de Usuario" name="username" type="text" inputClassName="border-[#000] border-[3.5px]" onChange={handleChange} />
                                </div>
                                <div className="flex">
                                    <CustomInput labelName="CPF" value={formatCPF(user.cpf)} name="cpf" type="text" inputClassName="border-[#000] border-[3.5px]" containerClassName="w-[41.2rem]" onChange={handleChange} maxLenght={14} />
                                </div>
                                <div className="flex flex-row gap-5">
                                <CustomInput labelName="Área" name="area" type="text" inputClassName="border-[#000] border-[3.5px]" onChange={handleChange} />
                                    <div>
                                        <label htmlFor="admin" className="text center">Admin</label>
                                        <input  name="admin" type="checkbox" onChange={handleChange} />
                                    </div>
                                </div>
                                <CustomInput labelName="Senha" name="password" type="password" inputClassName="border-[#000] border-[3.5px]" onChange={handleChange} />
                                <CustomInput labelName="Confirme a Senha" name="passwordconfirm" type="password" inputClassName="border-[#000] border-[3.5px]" onChange={handleChange} />
                            </div>
                            <CustomButton ref={buttonRef} name="Cadastrar" value="Cadastrar" className="m-5" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;