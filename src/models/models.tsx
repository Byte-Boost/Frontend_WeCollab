import { JwtPayload } from "jwt-decode";

// Modals
export type ModalProps = {
    isOpen: boolean;
    cb : () => void;
    closeModal: () => void;
}
export type TicketModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    cb : () => void;
    ticket: Ticket;
}

// Ticket related models
export type CreateTicket = {
    area: string, 
    title: string, 
    description: string, 
    observers: Array<number>
}
export type Ticket = {
    id: string, 
    area: string, 
    status: string, 
    title: string, 
    description: string, 
    dateOfCreation: Date, 
    requesterId: string
    observer: Array<Observer>
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
    role: string,
    admin: true | false
}
export interface MyJwtPayload extends JwtPayload {
    id: string,
    username: string,
    role: string,
    admin: string
}
export type Observer = {
    id: string,
    user: User;
}

// Area related models
export type Area = {
    name: string,
    Roles: Array<Role>
}
// Role related models
export type Role = {
    name: string,
}