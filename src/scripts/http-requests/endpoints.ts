import { Area, CreateTicket, Role, Ticket, TicketComment, User } from '@/models/models';
import { setCookie } from 'cookies-next';
import instance from './instance';

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
        setCookie('token', response.data.token);
        console.log(response.data.token )
    });
    return response;
}
export async function getUsers(filters: any={}) {
    const res = await instance.get<Array<User>>(`/users`, {
        params: {
            startsWith: filters.startsWith,
            limit: filters.limit
        }
    });
    return res.data;
}

// Ticket related endpoints
export async function postTicket(createTicket: CreateTicket) {
    await instance.post(`/tickets`, {
        area: createTicket.area,
        title: createTicket.title,
        description: createTicket.description,
        observers: createTicket.observers,
    });
}
export async function closeTicket(ticketId: string,cb? : Function){
    await instance.patch(`/tickets/close/${ticketId}`)
    cb? cb(): null;
}
export async function getTickets(page? : number, limit? : number) {
    const res = await instance.get<Array<Ticket>>(`/tickets`, {
        params:{
            page:page,
            limit:limit
        }
    });
    return res.data;
}
export async function getTicketById(id: number){
    const res = await instance.get<Ticket>(`/tickets/${id}`);
    return res.data;
}
export async function switchObserver(id: string, obs: Array<number>) {
    // obs is an array of userIDs
    const res = await instance.patch<Ticket>(`/tickets/forward/${id}`, obs);
    return res.data;
}

// Comment related endpoints
export async function postComment(comment: String, ticketId: String) {
    await instance.post(`/tickets/comment/${ticketId}`, {
        content: comment,
    });
}
export async function getCommentsByTicketId(ticketId: number){
    const res = await instance.get<Array<TicketComment>>(`/tickets/comment/${ticketId}`);
    return res.data;
}

// Area related endpoints
export async function getAreas(filter: any) {
    const res = await instance.get<Array<Area>>(`/areas`, {
        params: {
            startsWith: filter.startsWith
        }
    });
    return res.data;
}

// Role related endpoints
export async function getRoles(filter: any) {
    const res = await instance.get<Array<Role>>(`/roles`, {
        params: {
            startsWith: filter.startsWith,
            area: filter.area
        }
    });
    return res.data;
}