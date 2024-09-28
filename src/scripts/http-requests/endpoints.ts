import { jwtDecode } from 'jwt-decode';
import instance from './instance';
import { MyJwtPayload, Ticket, TicketComment, User } from '@/models/models';

export async function login(username: string, password: string) {
    
    console.log ("response")
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
export async function postComment(comment: String, ticketId: String) {
    const userToken: string = localStorage.getItem("token") || "";
    const decoded = jwtDecode<MyJwtPayload>(userToken);
    console.log(userToken+decoded.id)
    const response = await instance.post(`/tickets/comment/${ticketId}`, {
        content: comment,
        commenterId: decoded.id,
    });
}
export async function getCommentsByTicketId(ticketId: number){
    const res = await instance.get<Array<TicketComment>>(`/tickets/comment/${ticketId}`);
    return res.data;
}
export async function getTickets() {
    const res = await instance.get<Array<Ticket>>(`/tickets`);
    return res.data;
}
export async function getTicketById(id: number){
    const res = await instance.get<Ticket>(`/tickets/${id}`);
    return res.data;
}
