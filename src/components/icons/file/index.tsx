import { twMerge } from "tailwind-merge";

interface FileIconProps {
    className?: string;
    color?: string;
}

const FileIcon = ({ className, color = "#1C1C1F" }: FileIconProps) => {
    return (
        <svg 
        className={twMerge('fill-white', className)} 
        width="35" height="35" viewBox="-2.5 0 32 32" 
        fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <g id="icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-1776.000000, -284.000000)" fill={color} fillRule="nonzero">
                    <g id="1" transform="translate(1350.000000, 120.000000)">
                        <path d="M446,163.999494 L446,168.980703 C446,170.609602 447.142315,172 448.659002,172 L453,171.999494 L453,193 C453,194.656854 451.656854,196 450,196 L429,196 C427.343146,196 426,194.656854 426,193 L426,167 C426,165.343146 427.343146,164 429,164 L446,163.999494 Z M448.339153,164.498753 L452.32146,168.004143 C452.752813,168.383838 453,168.930731 453,169.505391 L453,169.999494 L448.659002,170 C448.343206,170 448,169.582258 448,168.980703 L448.001029,164.25843 C448.120967,164.326148 448.234368,164.406517 448.339153,164.498753 Z" id="paper">
                        </path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default FileIcon;