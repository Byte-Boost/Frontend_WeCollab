import { formatDateToSlash } from "@/scripts/utils/dataFormatter";
import { MouseEventHandler } from "react";
import BoxTicketIcon from "../icons/box_ticket";
import CrossIcon from "../icons/cross_icon";

interface CustomTableRowProps {
    id: string;
    date: any;
    owner: string;
    endDate?: string;
    status: string;
    user?: string;
    area?: string;
    title?: string;
    onClick: MouseEventHandler;
    onDelete: MouseEventHandler;
}

const CustomTableRow = ({
    id,
    date,
    owner,
    endDate,
    status,
    user,
    area,
    title,
    onClick,
    onDelete
}: CustomTableRowProps) => {
    const formattedDate = formatDateToSlash(date);
    const formattedEndDate = formatDateToSlash(endDate ? endDate : '');

    return (
        <tr onClick={onClick} className="cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300 ">
            <td data-label="ID" className="p-2 md:p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 lg:justify-normal  justify-end">
                    <p className="block antialiased font-sans text-md   leading-normal text-blue-gray-900 font-bold">
                        {id}
                    </p>
                </div>
            </td>
            <td data-label="Titúlo" className="p-2 md:p-4 border-b border-blue-gray-50">
                <p className="block antialiased font-sans text-sm  leading-normal text-blue-gray-900 font-normal text-ellipsis">
                    {title}
                </p>
            </td>
            <td data-label="Status" className="p-2 md:p-4 border-b border-blue-gray-50 ">
                <div className="block antialiased font-sans text-sm  leading-normal text-blue-gray-900 font-normal ">
                    {status === "Novo" ? 
                        <div className="flex lg:justify-start  justify-end">
                            <BoxTicketIcon className="fill-yellow-500 h-[16px] md:h-[20px]" />
                            <span className="bg-yellow-500 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Novo</span>
                        </div>
                        : status === "Em Andamento" ?
                        <div className="flex lg:justify-start  justify-end">
                            <BoxTicketIcon className="fill-green-500 h-[16px] md:h-[20px]" />
                            <span className="bg-green-500 text-green-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Em Andamento</span>
                        </div>
                        : status === "Concluído" ?
                        <div className="flex lg:justify-start justify-end">
                            <BoxTicketIcon className="fill-blue-500 h-[16px] md:h-[20px]" />
                            <span className="bg-blue-500 text-blue-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Concluído</span>
                        </div>
                        : null
                    }
                </div>
            </td>
            <td data-label="Área" className="p-2 md:p-4 border-b border-blue-gray-50">
                {area}
            </td>
            <td data-label="Data de criação" className="p-2 md:p-4 border-b border-blue-gray-50 ">
                <div className="flex items-center gap-3 lg:justify-normal justify-end">
                    {formattedDate}
                </div>
            </td>
            <td data-label="Data de conclusão" className="p-2 md:p-4 border-b border-blue-gray-50">
                {formattedEndDate ? formattedEndDate : '-'}
            </td>
            <td data-label="Owner" className="p-2 md:p-4 border-b border-blue-gray-50 ">
                    {owner}
            </td>
        </tr>
    );
};

export default CustomTableRow;