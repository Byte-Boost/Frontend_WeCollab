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
export type UserModalProps = {
    isOpen: boolean;
    cb : () => void;
    closeModal: () => void;
    user: User
}

// Ticket related models
export type CreateTicket = {
    area: string, 
    title: string, 
    description: string, 
    observers: Array<string>
}
export type getTicketsFilter = {
    status: string,
    area: string,
    userRelation: string
}
export type Ticket = {
    id: string, 
    area: string, 
    status: string, 
    title: string, 
    description: string, 
    dateOfCreation: Date, 
    requesterId: string
    Owner: {id: number, name: string},
    Observers: Array<Observer>
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
    id?: string,
    name: string,
    cpf: string,
    area: string | null,
    username: string,
    password: string,
    role: string,
    admin: true | false
    Role?: {
        name: string
    }
}
export interface MyJwtPayload extends JwtPayload {
    id: string,
    username: string,
    role: string,
    admin: string
}
export type Observer = {
    id: string,
    User: User;
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