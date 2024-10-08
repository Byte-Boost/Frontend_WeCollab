import instance from './instance';
import { CreateTicket, Ticket, TicketComment, User } from '@/models/models';
import { getSessionUser } from '../utils/userService';


// User related endpoints
export async function register(newUser: User) {
    await instance.post("accounts/register", {
        "name": newUser.name,
        "cpf": newUser.cpf,
        "area": newUser.area,
        "username": newUser.username,
        "password": newUser.password,
        "role": newUser.role,
        "admin": newUser.admin
    })
}
export async function login(username: string, password: string) {
    const response = await instance.post("/accounts/login", {
        username: username,
        password: password
    })
    .then(function(response){
        const token = response.data.token;
        localStorage.setItem("token", token)
    });
    return response;
}

// Ticket related endpoints
export async function postTicket(createTicket: CreateTicket) {
    let userToken = await getSessionUser()
    await instance.post(`/tickets`, {
        area: createTicket.area,
        category: createTicket.category,
        title: createTicket.title,
        description: createTicket.description,
        requesterId: userToken.id
    });
}
export async function closeTicket(ticketId: string){
    await instance.patch(`/tickets/close/${ticketId}`);
}
export async function getTickets() {
    const res = await instance.get<Array<Ticket>>(`/tickets`);
    return res.data;
}
export async function getTicketById(id: number){
    const res = await instance.get<Ticket>(`/tickets/${id}`);
    return res.data;
}
// Comment related endpoints
export async function postComment(comment: String, ticketId: String) {
    let userToken = await getSessionUser()
    await instance.post(`/tickets/comment/${ticketId}`, {
        content: comment,
        commenterId: userToken.id,
    });
}
export async function getCommentsByTicketId(ticketId: number){
    const res = await instance.get<Array<TicketComment>>(`/tickets/comment/${ticketId}`);
    return res.data;
}
