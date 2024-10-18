import CustomButton from "@/components/custom_button";
import FolderUpload from "@/components/folder_upload";
import { User } from "@/models/models";
import { getUsers } from "@/scripts/http-requests/endpoints";
import { MouseEvent, useEffect, useState } from "react";


function UploadPage() {
    const [user, setUser] = useState(Array<User>);

    async function getUser(){
        const users = await getUsers()
        setUser(users)
    }

    useEffect(() => {
        getUser()
      }, [])

    return(
        <div className="bg-white min-h-screen flex flex-col justify-start ">
            <section className="ticket">
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {
                            user.map((user: User) => {
                                return <FolderUpload name={user.name} />
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default UploadPage;
