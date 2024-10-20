import { useEffect, useState } from "react";
import UserTableHeader from "@/components/user_table_header";
import UserTableRow from "@/components/user_table_row";
import { deleteUser, getUserById, getUsers } from "@/scripts/http-requests/endpoints";
import { User } from "@/models/models";
import { confirmationAlert, failureAlert } from "@/scripts/utils/shared";
import { Label, Pagination, TextInput } from "flowbite-react";
import UserModal from "@/components/user_modal";

const emptyUser: User = {
    id: "",
    name: "",
    cpf: "",
    area: null,
    username: "",
    password: "",
    role: "",
    admin: false,
    Role: {
        name: ""
    }
}

function UsersPage(){
    const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>(emptyUser);
    const [startsWith, setStartsWith] = useState("");
    const [data, setData] = useState(Array<User>);
    const [page, setPage] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setStartsWith(value);
    };

    async function getAllUsers() {
        try {
            let users = await getUsers({
                startsWith: startsWith,
                page: page,
                limit: 7
            })
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

    const closeModal = () => {
        setEditUserModalIsOpen(false);
        getAllUsers();
    }

    async function getUser(userId: string) {
        let user: User = await getUserById(userId);
        setSelectedUser(user);
    }

    useEffect(() => {
        getAllUsers()
    }, [page, startsWith]);

    const onPageChange = (page: number) => setPage(page);

    return (
        <div className="bg-white min-h-screen flex justify-center">
            <section id="users" className="w-full flex flex-col items-center">
                <div className="p-4 min-w-[40rem]">
                    <Label htmlFor="userSearch" value="Pesquisar Usuario:" className="font-bold" />
                    <div className="border-2 rounded-lg shadow-inner">
                        <TextInput id="userSearch" type="text" name="userSearch" required onChange={handleChange}/>
                    </div>
                </div>

                <div className="p-4 flex justify-center items-center">
                    <table className="min-w-[70rem] max-w-[80rem] table-auto text-left shadow-xl">
                        <UserTableHeader titles={["CPF","Nome", "Carreira", "Cargo"]}/>
                        <tbody>
                            {data.map((user, ij) => (
                                    <UserTableRow key={ij} onClick={() => {setEditUserModalIsOpen(true); setSelectedUser(user)}} 
                                    name={user.name} 
                                    cpf={user.cpf} 
                                    area={user.area} 
                                    username={user.username} 
                                    role={user.Role?.name || ""} 
                                    onDelete={() => {
                                        confirmationAlert("Tem certeza que deseja remover esse usuário?", 'deleteuser', () => {
                                            user.id? user.id = user.id : user.id= '';
                                            deleteUser(user.id, getAllUsers)
                                        })
                                    }}/>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex overflow-x-auto sm:justify-center pt-5">
                    <Pagination
                    layout="pagination"
                    currentPage={page}
                    totalPages={1000}
                    onPageChange={onPageChange}
                    showIcons
                    className="flex items-center space-x-2"
                    >
                            <button className="w-12 h-12 flex items-center justify-center">Previous</button>
                            <button className="w-12 h-12 flex items-center justify-center">1</button>
                            <button className="w-12 h-12 flex items-center justify-center">2</button>
                            <button className="w-12 h-12 flex items-center justify-center">3</button>
                            <button className="w-12 h-12 flex items-center justify-center">4</button>
                            <button className="w-12 h-12 flex items-center justify-center">Next</button>
                    </Pagination>
                </div>
                
            </section>
            <UserModal isOpen={editUserModalIsOpen} closeModal={closeModal} cb={getAllUsers} user={selectedUser} />
        </div>
    );
}

export default UsersPage;
