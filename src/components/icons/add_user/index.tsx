
interface AddUserIconProps {
    className?: string;
}

const AddUserIcon = ({className}: AddUserIconProps) => {
    return ( 
      <svg 
      height="35" 
      width="35" 
      version="1.1" 
      id="Layer_1" 
      viewBox="0 0 328 328" 
      className={className}
      >
    <g id="XMLID_455_">
        <path id="XMLID_458_" d="M15,286.75h125.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105s-47.103-105-105-105
          c-34.488,0-65.145,16.716-84.298,42.47c-7.763-1.628-15.694-2.47-23.702-2.47c-63.411,0-115,51.589-115,115
          C0,280.034,6.716,286.75,15,286.75z M223,146.75c41.355,0,75,33.645,75,75s-33.645,75-75,75s-75-33.645-75-75
          S181.645,146.75,223,146.75z"/>
        <path id="XMLID_461_" d="M115,1.25c-34.602,0-62.751,28.15-62.751,62.751S80.398,126.75,115,126.75
          c34.601,0,62.75-28.148,62.75-62.749S149.601,1.25,115,1.25z"/>
        <path id="XMLID_462_" d="M193,236.75h15v15c0,8.284,6.716,15,15,15s15-6.716,15-15v-15h15c8.284,0,15-6.716,15-15s-6.716-15-15-15
          h-15v-15c0-8.284-6.716-15-15-15s-15,6.716-15,15v15h-15c-8.284,0-15,6.716-15,15S184.716,236.75,193,236.75z"/>
      </g>
   </svg>
    );
}
export default AddUserIcon;