import { MouseEventHandler } from "react"
import { formatCPF } from "@/scripts/utils/dataFormatter";

interface UserTableRowProps {
    cpf: string;
    name: string;
    username: string;
    area: string | null;
    role: string;
    onClick: MouseEventHandler;
    onDelete: MouseEventHandler;
}

const UserTableRow = (userTableRowProps: UserTableRowProps) => {
    return (
        <tr onClick={userTableRowProps.onClick} className="bg-white cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300 ">
            <td className="p-2 md:p-4 border-b border-blue-gray-50 w-[10rem]">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {formatCPF(userTableRowProps.cpf)}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50 w-[8rem]">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.area}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50 w-[16rem]">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.role}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.name} <span className="italic text-[0.7rem]">({userTableRowProps.username})</span>
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default UserTableRow;