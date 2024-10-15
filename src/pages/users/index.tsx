import { useEffect, useState } from "react";
import UserTableHeader from "@/components/user_table_header";
import UserTableRow from "@/components/user_table_row";
import { deleteUser, getUsers } from "@/scripts/http-requests/endpoints";
import { User } from "@/models/models";
import { confirmationAlert, failureAlert } from "@/scripts/utils/shared";

function UsersPage(){
    const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(1);
    const [data, setData] = useState(Array<User>);
    async function getAllUsers() {
        try {
            let users = await getUsers()
            setData(users)
        } catch(error: any) {
            if(error.status === 401) {
                failureAlert("Credenciais inválidas", `${error}`, ()=>{})
            } else {
                failureAlert("Erro de Conexão", `${error}`, () => {})
            }
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className="bg-white min-h-screen flex justify-center ">
            <div className="w-full min-w-max table-auto text-left">
                <div>
                    <table className="w-full min-w-max table-auto text-left">
                        <UserTableHeader titles={["Nome","CPF", "Área", "Username", "Role"]}/>
                        <tbody>
                            {data.map(user => (
                                <>
                                    <UserTableRow onClick={() => {setEditUserModalIsOpen(true); setSelectedUserId(Number(user.id))}} name={user.name} cpf={user.cpf} area={user.area} username={user.username} role={user.role} onDelete={() => {confirmationAlert("Tem certeza que deseja remover esse usuário?", 'deleteuser', () => {deleteUser(user.id.toString(), getAllUsers)})}}/>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;