import { MouseEventHandler } from "react";
import BoxTicketIcon from "../icons/box_ticket";
import Link from 'next/link';

interface FolderUploadProps {
    name: string
    onClick?: MouseEventHandler;
}

const FolderUpload = ({name, onClick}: FolderUploadProps) => {
    return(
        <tr onClick={onClick} className="cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300">
            <div className="flex items-center gap-3">
                <Link href="/user_folder"className="flex items-center gap-3">
                </Link>
            </div>
            <td data-label="ID" className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">
                        <BoxTicketIcon className="fill-black" />
                    </p>
                </div>
            </td>
            <td data-label="NAME" className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">
                        {name}
                    </p>
                </div>
            </td>
        </tr>
    )
}

export default FolderUpload;

