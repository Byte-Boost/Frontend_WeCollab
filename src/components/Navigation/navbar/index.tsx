import './navbar.css'
import LogOutIcon from "../../icons/logout";
import TicketIcon from "../../icons/ticket";
import HomeIcon from "../../icons/home";
import Link from 'next/link';
import AddUserIcon from '../../icons/add_user';
import { useEffect, useState } from 'react';
import { getSessionUser } from '@/scripts/utils/userService';
import FolderNavbarIcon from '../../icons/folder/folder_navbar';
import UserIcon from '../../icons/user';
import PasswordLockIcon from '../../icons/passwordLock';
import { getSelf } from '@/scripts/http-requests/endpoints';


function Navbar(){
    const [user,setUser] = useState<any>();
    const [userPfp, setUserPfp] = useState('');
    async function getUser(){
        let secUser = await getSessionUser()
        setUser(secUser)
    }
    useEffect(() => {
        getUser()
        getSelf().then(function(response) {
            setUserPfp(response.pfp);
        });
    },[])
    return (
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid  ">
            <div className="navbar__inner">
                <div className="navbar__items navbar__items--left max-sm:justify-center">
                    <Link href="/home" className="hover:scale-125 transition-all"><HomeIcon/></Link>
                    <Link href="/myProfile" className="hover:scale-125 transition-all ml-4">
                        {
                            userPfp == '' || userPfp == null?
                            <div className="aspect-square rounded-full w-[3rem] cursor-pointer inline-block bg-black text-white text-center content-center font-mono text-[1rem]">{user?.username.substring(0,1).toUpperCase()}</div>
                            :<img src={userPfp} className='object-cover aspect-square rounded-full w-[3rem] cursor-pointer inline-block'/>
                        }       
                    </Link>
                </div>
                <div className=" navbar__items navbar__items--right">
                    <div className="flex flex-row gap-6">
                        <Link href="/ticket" className="hover:scale-125 transition-all"><TicketIcon/></Link>
                        <Link href="/archives" className="hover:scale-125 transition-all"><FolderNavbarIcon/></Link>
                        {user?.admin && <Link href="/users" className='hover:scale-125 transition-all'><UserIcon/></Link>} 
                        {user?.admin && <Link href="/register" className='hover:scale-125 transition-all'><AddUserIcon/></Link>} 
                        <Link href="/" className="hover:scale-125 transition-all"><LogOutIcon/></Link>
                    </div>
                </div>  
            </div>
        </nav>
)};

export default Navbar;
