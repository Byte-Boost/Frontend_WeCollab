import { formatCNPJ, formatCPF, formatDateToSlash, formatMoney } from "@/scripts/utils/dataFormatter";
import { MouseEventHandler } from "react";
import BoxTicketIcon from "../icons/box_ticket";

interface CustomTableRowProps {
    id: string;
    date: any;
    endDate?: string;
    status: string;
    user?: string;
    area?: string;
    title?: string;
    onClick : MouseEventHandler;
}

const CustomTableRow = ({
    id,
    date,
    endDate,
    status,
    user,
    area,
    title,
    onClick
}: CustomTableRowProps) => {
    const formattedDate = formatDateToSlash(date);
    const formattedEndDate = formatDateToSlash(endDate? endDate:'' );

    return (
        <tr onClick={onClick} className="cursor-pointer hover:bg-gray-200 transition-all active:bg-gray-300">
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                {id}
                </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal text-ellipsis">
            {title}
            </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
          { status === "Novo" ? 
                                <div className=" flex justify-start">
                                    <BoxTicketIcon className="fill-yellow-500  h-[20px]"/>
                                    <span className="bg-yellow-500 text-yellow-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Novo</span>
                                </div>
                                : status === "Em andamento" ?
                                    <div className="flex justify-start">
                                         <BoxTicketIcon className="fill-green-500  h-[20px]"/>
                                        <span className="bg-green-500 text-green-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Em Andamento</span>
                                    </div>
                                : status === "Concluído" ?
                                    <div className="flex justify-start">
                                        <BoxTicketIcon className="fill-blue-500  h-[20px]"/>
                                        <span className="bg-blue-500 text-blue-800 text-xs font-medium ml-3 me-2 px-1 py-0.5 rounded">Concluído</span>
                                    </div>
                                : null
                            } 
            </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
            {area}
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            {formattedDate}
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
            {formattedEndDate? formattedEndDate: '-'}
        </td>
      </tr>

    );
};

export default CustomTableRow;