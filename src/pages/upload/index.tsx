import CustomButton from "@/components/custom_button";
import FolderUpload from "@/components/folder_upload";
import { MouseEvent } from "react";


function UploadPage() {
    return(
        <>
            
            <FolderUpload name={"João"} />
            <FolderUpload name={"Markos"} />
            <FolderUpload name={"Jaqueline"} />
        </>
    )
}

export default UploadPage;
