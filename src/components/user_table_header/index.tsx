interface UserTableHeaderProps {
    titles: Array<string>
}

const UserTableHeader = (userTableHeaderProps: UserTableHeaderProps) => {
    return (
        <thead>
            <tr>
                {userTableHeaderProps.titles.map(title => (
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                        <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">{title}</p>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default UserTableHeader;