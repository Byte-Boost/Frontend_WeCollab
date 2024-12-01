import CustomButton from "@/components/CustomElements/custom_button";
import CustomCheckbox from "@/components/CustomElements/custom_checkbox";
import CustomInput from "@/components/CustomElements/custom_input";
import CustomSelect from "@/components/CustomElements/custom_select";
import { Area, Role, User } from "@/models/models";
import { changeUserPassword, changeUserPfp, getAreas, getRoles, getSelf, register } from "@/scripts/http-requests/endpoints";
import { formatCPF } from "@/scripts/utils/dataFormatter";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { Card } from "flowbite-react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

function changePassword() {
    const emptyPasswords: any = {
        currentPass: '',
        newPass: '',
    };
    
    const [passwordDto, setPasswordDto] = useState(emptyPasswords);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userPfp, setUserPfp] = useState('');
    const buttonRef = useRef(null);
    const handleChange = (e: any) => {
        const { name, value} = e.target;
        if (name === "passwordconfirm") {
            setPasswordConfirm(value);
        }
        else {
            setPasswordDto({ ...passwordDto, [name]: value });;
        }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (passwordDto.newPass !== passwordConfirm) {
            failureAlert("Senhas não coincidem", "A senha e a confirmação de senha devem ser iguais.", () => {});
            return;
        }

        try {
            await changeUserPassword(passwordDto).then(function(response) {
                successAlert('Senha Alterada', 'Sua senha foi alterada com sucesso!', () => {});
            });
        } catch (error: any) {
            if (error.status === 403) {
                failureAlert("Sem Autorização", `${error}`, () => {});
            } else if (error.status === 401) {
                failureAlert("Senha atual incorreta", `${error}`, () => {});
            } else {
                failureAlert( `Erro ${error.status}`, `${error}`, () => {});
            }
            console.log(error);
        }
    };

    const imageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            if (reader.result) {
              resolve(reader.result.toString());
            } else {
              reject("Failed to convert file to Base64 string.");
            }
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          reader.readAsDataURL(file);
        });
    };
    const handleChangePfp = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file){
            try {
                const base64String = await imageToBase64(file)
                changeUserPfp(base64String).then(function(response) {
                    getSelf().then(function(response) {
                        setUserPfp(response.pfp);
                    });
                    successAlert('Foto de Perfil Alterada', 'Sua foto de perfil foi alterada com sucesso!', () => {});
                });
            } catch (error: any) {
                failureAlert('Erro ao alterar foto de perfil', 'Ocorreu um erro ao tentar alterar a foto de perfil.', () => {});
            }
        }
    };
    useEffect(()=>{
        getSelf().then(function(response) {
            setUserPfp(response.pfp);
        });
    }, [])

    return (
        <div className="mt-4 h-[85vh] flex justify-center items-center">
            <Head>
                <title>Redefinir Senha - WeCollab</title>
            </Head>
            <div className='min-h-[85vh] min-w-full flex justify-center items-center'>
                <div className="text-center">
                    <Card className="p-4 border-2 mb-2">
                        <h1 className="text-5xl pt-5 font-mono">Meu perfil</h1>
                        <div className="text-center">
                            <label htmlFor="file">
                                <img src={userPfp} className="aspect-square rounded-full p-2 w-[8rem] cursor-pointer inline-block"></img>
                            </label>
                            <input className='hidden' type="file" name="file" id='file' required accept='image/*' onChange={handleChangePfp}/>
                        </div>
                    </Card>
                    <Card className="p-4 border-2">
                        <h1 className="text-5xl pt-5 font-mono">Redefinir Senha</h1>
                        <div className="text-center">
                        <form action="" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <CustomInput labelName="Senha atual" name="currentPass" type="password" inputClassName="border-[#000]" containerClassName="w-[41.2rem]" onChange={handleChange} />
                                    </div>

                                    <div className="flex flex-row gap-5">
                                        <CustomInput labelName="Senha" name="newPass" type="password" inputClassName="border-[#000]" onChange={handleChange} />
                                        <CustomInput labelName="Confirme a Senha" name="passwordconfirm" type="password" inputClassName="border-[#000]" onChange={handleChange} />
                                    </div>
                                </div>
                                
                                <div className="flex flex-row justify-center">
                                    <CustomButton ref={buttonRef} name="RedefinirSenha" value="Redefinir Senha" className="m-5" />
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default changePassword;