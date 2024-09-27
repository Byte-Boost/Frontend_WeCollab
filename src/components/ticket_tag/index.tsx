import "./tag.css";

interface TagProps {
    className?: string;
    tagName: string;
}

// Colors: #FF860E; -> Orange
// Colors: #119CFF; -> Blue
// Colors: #FF0E0E; -> Red

// Colors: #46E964; -> Green claro

function TicketTag(TagProps: TagProps) {
    return(
        <div className={TagProps.className}>
            <h3>{TagProps.tagName}</h3>
        </div>
    );
}

export default TicketTag