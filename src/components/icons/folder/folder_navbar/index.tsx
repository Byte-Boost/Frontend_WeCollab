interface IconProps {
    className?: string;
}

const FolderNavbarIcon = ({className}: IconProps) => {
    return(
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <path d="M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path>
        </svg>
    );
}

export default FolderNavbarIcon;
