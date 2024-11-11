import { useEffect, useState } from "react";
import UserTableHeader from "@/components/user_table_header";
import UserTableRow from "@/components/user_table_row";
import { deleteUser, getUserById, getUsers } from "@/scripts/http-requests/endpoints";
import { User } from "@/models/models";
import { confirmationAlert, failureAlert } from "@/scripts/utils/shared";
import { Label, Pagination, TextInput } from "flowbite-react";
import UserModal from "@/components/user_modal";
import CustomPagination from "@/components/custom_pagination";
import Head from "next/head";

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
    const [totalPages, setTotalPages] = useState(0)
    const [data, setData] = useState(Array<User>);
    const [page, setPage] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value } = e.target;
        setStartsWith(value);
    };

    async function getAllUsers() {
        try {
            
            let pageLimit = 7;

            let usersQuery = await getUsers({
                startsWith: startsWith
            }, page, pageLimit)

            let totalEntries = usersQuery.count
            let users = usersQuery.rows
            setData(users)
            setTotalPages(Math.ceil(totalEntries/pageLimit))
            return users;
        } catch(error: any) {
            if(error.status === 401) {
                failureAlert("Credenciais inválidas", `${error}`, ()=>{})
            } else {
                failureAlert("Erro de Conexão", `${error}`, () => {})
            }
            console.log(error)
            return null;
        }
    }

    const closeModal = () => {
        setEditUserModalIsOpen(false);
        getAllUsers();
    }
    useEffect(() => {
        getAllUsers().then((newUsers) => {
            if(newUsers && newUsers.length === 0 && page > 1) {
                console.log(newUsers)
                setPage(page-1);
        }});
    }, [page, startsWith]);

    const onPageChange = (page: number) => setPage(page);

    return (
        <div className="min-h-screen flex justify-center" id="semblante">
            
            <Head>
                <title>Lista de Usuarios - WeCollab</title>
            </Head>
            <section id="users" className="w-full flex flex-col items-center">
                <div className="p-4 min-w-[40rem]">
                    <Label htmlFor="userSearch" value="Pesquisar Usuario:" className="font-bold" />
                    <div className="border-2 rounded-lg shadow-inner">
                        <TextInput id="userSearch" type="text" name="userSearch" required onChange={handleChange}/>
                    </div>
                </div>

                <div className="p-4 flex justify-center items-center">
                    <table className="bg-white min-w-[70rem] max-w-[80rem] table-auto text-left shadow-xl">
                        <UserTableHeader titles={["CPF", "Carreira", "Cargo", "Nome"]}/>
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

                <div className="flex overflow-x-auto sm:justify-center py-5">
                    
                    {
                    (data.length + 1 > 5 || page > 1 ) &&
                        <CustomPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={onPageChange} 
                        />
                      
                    }
                   
                    </div>
                
            </section>
            <UserModal isOpen={editUserModalIsOpen} closeModal={closeModal} cb={getAllUsers} user={selectedUser} />
        </div>
    );
}

export default UsersPage;
