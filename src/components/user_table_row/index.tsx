import { MouseEventHandler } from "react"
import CrossIcon from "../icons/cross_icon"

interface UserTableRowProps {
    name: string;
    cpf: string;
    area: string | null;
    username: string;
    role: string;
    onClick: MouseEventHandler;
    onDelete: MouseEventHandler;
}

const UserTableRow = (userTableRowProps: UserTableRowProps) => {
    return (
        <tr onClick={userTableRowProps.onClick} className="cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300 ">
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.name}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.cpf}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.area}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.username}
                    </p>
                </div>
            </td>
            <td className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {userTableRowProps.role}
                    </p>
                </div>
            </td>
            <td data-label="Ações" className="p-2 md:p-4 border-b border-blue-gray-50 ">
                <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 md:w-10 max-w-[32px] md:max-w-[40px] h-8 md:h-10 max-h-[32px] md:max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button" onClick={(event) => {
                    event.stopPropagation();
                    userTableRowProps.onDelete(event);
                }}>
                    <span className="absolute  top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <CrossIcon />
                    </span>
                </button>
            </td>
        </tr>
    );
};

export default UserTableRow;