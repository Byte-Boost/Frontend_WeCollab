import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import instance from './instance';
import { MyJwtPayload, User } from '@/models/models';


export const api = axios.create({
    baseURL: "http://127.0.0.1:3200"
})

export async function login(username: string, password: string) {
    
    const response = await api.post("/accounts/login", {
        username: username,
        password: password
    });

    const token = response.data.token;
    console.log(token);
    localStorage.setItem("token", token)
}
// This will be redone using instance.ts, but later
export async function register(newUser: User) {
    const axiosConfig = {
        baseURL: process.env.NEXT_PUBLIC_API_IP,
        timeout: 30000,
    };
    const instance =  axios.create(axiosConfig);
    console.log(instance.defaults.baseURL);
    // Add a request interceptor
    instance.interceptors.request.use((config) => {
        const authorizationValue = 'bear ' + localStorage.getItem('token');

        config.headers.Authorization = authorizationValue;
        
        return config
    })

    await api.post("accounts/register", {
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

    const token = response.data.token;
    console.log(token);
    localStorage.setItem("token", token)
}
