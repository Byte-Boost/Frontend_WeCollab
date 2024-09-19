import { Link } from "react-router-dom";
import './navbar.css'
import LogOutIcon from "../icons/logout";
import SettingsIcon from "../icons/settings";
import AreaTicketIcon from "../icons/area_ticket";
function Navbar(){
    return (
        <nav className="navbar navbar--fixed-top max-sm:grid-cols-1 max-sm:grid  ">
            <div className="navbar__inner">
                <div className="navbar__items navbar__items--left max-sm:justify-center">
                  
                </div>
                <div className=" navbar__items navbar__items--right">
                    <div className="flex flex-row gap-6">
                    <Link to="/"><AreaTicketIcon/></Link>
                    <Link to="/"><SettingsIcon/></Link>
                    <Link to="/test"><LogOutIcon/></Link>
                    </div>
                </div>  
            </div>
        </nav>
)};

export default Navbar;
