import CustomButton from "@/components/custom_button";
import FolderUpload from "@/components/folder_upload";
import GeneralFolderArea from "@/components/general_folder_area";
import { User } from "@/models/models";
import { getUsers } from "@/scripts/http-requests/endpoints";
import { MouseEvent, use, useEffect, useState } from "react";


function UploadPage() {
    const [user, setUser] = useState(Array<User>);
    const [area, setArea] = useState(Array<string>)

    async function getUser() {
        const users = await getUsers()
        console.log(users)
        setUser(users)
    }

    async function getUsersArea() {
        const users = await getUsers()
        let area1: Set<string> = new Set<string>
        let areas: Array<string> = []
        users.forEach(e => {
            if(e.area != null) {
                area1.add(e.area)
            }
        })
        area1.forEach(e => {
            areas.push(e)
        })

        console.log(areas)
        setArea(areas)
    }

    useEffect(() => {
        getUser()
      }, [])

    useEffect(() => {
        getUsersArea()
      }, [])

    return(
        <div className="bg-white min-h-screen flex flex-col justify-start ">
            <section className="ticket">
                <GeneralFolderArea area="Administrativa" />
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {
                            user.map((user: User) => {
                                if(user.area == "Administrativa") {
                                    return <FolderUpload name={user.name} />
                                }
                            })
                        }
                    </tbody>
                </table>
                <GeneralFolderArea area="Gestão" />
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {
                            user.map((user: User) => {
                                if(user.area == "Gestao") {
                                    return <FolderUpload name={user.name} />
                                }
                            })
                        }
                    </tbody>
                </table>
                <GeneralFolderArea area="Negócios" />
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {
                            user.map((user: User) => {
                                if(user.area == "Negocios") {
                                    return <FolderUpload name={user.name} />
                                }
                            })
                        }
                    </tbody>
                </table>
                <GeneralFolderArea area="Técnica" />
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {
                            user.map((user: User) => {
                                if(user.area == "Tecnica") {
                                    return <FolderUpload name={user.name} />
                                }
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default UploadPage;
