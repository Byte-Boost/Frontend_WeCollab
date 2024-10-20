import './navbar.css'
import LogOutIcon from "../icons/logout";
import TicketIcon from "../icons/ticket";
import HomeIcon from "../icons/home";
import Link from 'next/link';
import AddUserIcon from '../icons/add_user';
import { useEffect, useState } from 'react';
import { getSessionUser } from '@/scripts/utils/userService';
import FolderNavbarIcon from '../icons/folder/folder_navbar';
import UserIcon from '../icons/user';


function Navbar(){
    const [user,setUser] = useState<any>();
    async function getUser(){
        let secUser = await getSessionUser()
        setUser(secUser)
    }
    useEffect(() => {
        getUser()
    },[])
    return (
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid  ">
            <div className="navbar__inner">
                <div className="navbar__items navbar__items--left max-sm:justify-center">
                <Link href="/home" className="hover:scale-125 transition-all"><HomeIcon/></Link>
                </div>
                <div className=" navbar__items navbar__items--right">
                    <div className="flex flex-row gap-6">
                       
                        <Link href="/ticket" className="hover:scale-125 transition-all"><TicketIcon/></Link>
                        <Link href="/upload" className="hover:scale-125 transition-all"><FolderNavbarIcon/></Link>
                        {user?.admin && <Link href="/users" className='hover:scale-125 transition-all'><UserIcon/></Link>} 
                        {user?.admin && <Link href="/register" className='hover:scale-125 transition-all'><AddUserIcon/></Link>} 
                        <Link href="/" className="hover:scale-125 transition-all"><LogOutIcon/></Link>
                    </div>
                </div>  
            </div>
        </nav>
)};

export default Navbar;
