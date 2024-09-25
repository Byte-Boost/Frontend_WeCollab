import axios from 'axios';

interface User {
    name: string,
    cpf: string,
    area: string | null,
    username: string,
    password: string,
    role: "Manager" | "User",
    admin: true | false
}

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