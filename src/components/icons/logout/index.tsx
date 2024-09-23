
interface LogOutIconProps {
    className?: string;
}

const LogOutIcon = ({className}: LogOutIconProps) => {
    return ( 
        <svg 
        width="35" 
        height="35"
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={"w-35 h-35  stroke-black stroke-2 "}
        >
        <title>LogOutIcon</title>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    );
}
export default LogOutIcon;