interface GeneralFolderAreaProps {
    area: string
}

function GeneralFolderArea(area: GeneralFolderAreaProps) {
    return(
        <div className="bg-cyan-300">
            <p>{area.area}</p>
        </div>
    );
}

export default GeneralFolderArea;
