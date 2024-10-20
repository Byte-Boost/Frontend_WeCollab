
interface UserIconProps {
    className?: string;
}

const UserIcon = ({className}: UserIconProps) => {
    return ( 
      <svg 
      height="35" 
      width="35" 
      version="1.1" 
      id="Layer_1" 
      viewBox="0 0 328 328" 
      className={className}
      >
    <g id="XMLID_470_">
        <path id="XMLID_472_" d="M79.999,62.75c0,34.601,28.149,62.75,62.751,62.75s62.751-28.149,62.751-62.75S177.352,0,142.75,0
            S79.999,28.149,79.999,62.75z"/>
        <path id="XMLID_473_" d="M42.75,285.5h200c8.284,0,15-6.716,15-15c0-63.411-51.589-115-115-115s-115,51.589-115,115
            C27.75,278.784,34.466,285.5,42.75,285.5z"/>
    </g>
   </svg>
    );
}
export default UserIcon;