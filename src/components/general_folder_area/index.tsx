import { MouseEventHandler } from "react";
import './general_folder_area.css'

interface GeneralFolderAreaProps {
    area: string
    onClick?: MouseEventHandler;
}

function GeneralFolderArea({area, onClick}: GeneralFolderAreaProps) {
    return(
        <div className="folder_desc" onClick={onClick}>
            <p>{area}</p>
            {/* <p>+</p> */}
        </div>
    );
}

export default GeneralFolderArea;
