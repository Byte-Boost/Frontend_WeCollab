import { JwtPayload } from "jwt-decode";

// Modals
export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
}
export type TicketModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    ticket: Ticket;
}

// Ticket related models
export type CreateTicket = {
    area: string, 
    category: string, 
    title: string, 
    description: string, 
    requesterId: string
}
export type Ticket = {
    id: string, 
    area: string, 
    owner: string,
    responsible:Array<string>,
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
    ticketId: string,
    User: {
        id: string,
        name: string,
        role: string,
        area: string,
    }
}

// User related models
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