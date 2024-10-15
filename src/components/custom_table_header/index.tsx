import BoxTicketIcon from "../icons/box_ticket";


interface CustomTableHeaderProps {

}


const CustomTableHeader = () =>{
    return(
        <thead>
        <tr>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">ID</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Titúlo</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 "><BoxTicketIcon className="fill-black h-[20px] inline-block"/>Status</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Área</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Data de criação</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Data de conclusão</p>
          </th>
          <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Owner</p>
          </th>
        </tr>
      </thead>
    )
}
export default CustomTableHeader;