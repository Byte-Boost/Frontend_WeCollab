import './navbar.css'
import LogOutIcon from "../icons/logout";
import SettingsIcon from "../icons/settings";
import AreaTicketIcon from "../icons/area_ticket";
import TicketIcon from "../icons/ticket";
import HomeIcon from "../icons/home";
import Link from 'next/link';
function Navbar(){
    return (
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid  ">
            <div className="navbar__inner">
                <div className="navbar__items navbar__items--left max-sm:justify-center">
                  
                </div>
                <div className=" navbar__items navbar__items--right">
                    <div className="flex flex-row gap-6">
                        <Link href="/home" className="hover:scale-125 transition-all"><HomeIcon/></Link>
                        <Link href="/ticket" className="hover:scale-125 transition-all"><TicketIcon/></Link>
                        <Link href="/areatickets" className="hover:scale-125 transition-all"><AreaTicketIcon/></Link>
                        {/*
                        <Link href="/settings" className="hover:scale-125 transition-all" ><SettingsIcon/></Link>
                        */}
                        <Link href="/" className="hover:scale-125 transition-all"><LogOutIcon/></Link>
                    </div>
                </div>  
            </div>
        </nav>
)};

export default Navbar;
