import { Area, CreateTicket, getTicketsFilter, Role, Ticket, TicketComment, User } from '@/models/models';
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
export async function getUsers(filters: any={startsWith:""}, page?:number, limit?:number) {
    const res = await instance.get(`/users`, {
        params: {
            startsWith: filters.startsWith,
            limit: limit,
            page: page
        }
    });
    return res.data;
}
export async function getUserById(userId: string) {
    const res = await instance.get(`/users/${userId}`)
    return res.data;
}
export async function deleteUser(userId: string, cb?: Function) {
    await instance.delete(`/accounts/${userId}`)
    cb? cb(): null;
} 
export async function editUser(userId: string, user: User, cb?: Function) {
    await instance.patch(`/accounts/${userId}`, user)
    cb? cb(): null;
}
export async function resetUserPassword(userId: string){
    await instance.patch(`/users/${userId}/reset-password`)
}
export async function changeUserPassword({currentPass, newPass}: {currentPass: string, newPass: string}) {
    await instance.patch(`/users/update-password`, {
        "currentPassword": currentPass,
        "newPassword": newPass
    })
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
export async function getTickets(filters : getTicketsFilter = {status: "", area: "", userRelation: ""}, page? : number, limit? : number) {
    const res = await instance.get<{count: number, rows: Array<Ticket>}>(`/tickets`, {
        params:{
            area: filters.area,
            status: filters.status,
            userRelation: filters.userRelation,
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
export async function switchObserver(id: string, area: string, obs: Array<number>) {
    // obs is an array of userIDs
    const res = await instance.patch<Ticket>(`/tickets/forward/${id}`, {area: area, observers: obs});
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
// Archive related endpoints
export async function uploadArchive(file : Blob, userId? : number | null,area?: string | null){
    let formData = new FormData();
    formData.append('archive', file);
    if (userId) formData.append('userId', userId.toString());
    if (area) formData.append('area', area);
    const res = await instance.post(`/archives/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return res.data;
}
export async function getArchives() {
    const res = await instance.get(`/archives`)
    return res.data;
}
export async function downloadArchive(filename: string,downloadname?:string) {
    try {
        console.log(`/archives/download/${filename}`)
      const res = await instance.get(`/archives/download/${filename}`, {
        responseType: 'blob',
      });
  
      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadname? downloadname: filename); // or any other extension if needed
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      return res.data;
    } catch (error) {
      console.error('Error downloading the archive:', error);
      throw error;
    }
}
export async function deleteArchive(filename: string){
    try{
    const res = await instance.delete(`/archives/delete/${filename}`)
    return res.data;
    }
    catch(error){
        console.error('Error deleting the archive:', error);
        throw error;
    }
}