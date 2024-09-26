import { JwtPayload } from "jwt-decode";

// Modals
export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    ticket: Ticket;
}
// Other models
export type Ticket = {
    id: string, 
    area: string, 
    status: string, 
    category: string, 
    title: string, 
    description: string, 
    dateOfCreation: Date, 
    requesterId: string
}
export type TicketComment = {
    id: string, 
    content: string, 
    date: Date, 
    commenterId: string, 
    ticketId: string
}
export interface User {
    name: string,
    cpf: string,
    area: string | null,
    username: string,
    password: string,
    role: "Manager" | "User",
    admin: true | false
}

export interface MyJwtPayload extends JwtPayload {
    id: string,
    username: string,
    role: string,
    admin: string
}