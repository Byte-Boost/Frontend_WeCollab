import { MouseEventHandler } from "react";
import FolderIcon from "@/components/icons/folder/folder_icon";


interface FolderUploadProps {
    name: string
    onClick?: MouseEventHandler;
}

const FolderUpload = ({name, onClick}: FolderUploadProps) => {
    return(
        <tr onClick={onClick} className="cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300">
            <td data-label="ID" className="p-2 md:p-4 border-b border-blue-gray-50">
                <FolderIcon className="fill-black" />
            </td>
            <td data-label="NAME" className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-bold">
                        {name}
                    </p>
                </div>
            </td>
        </tr>
    )
}

export default FolderUpload;

