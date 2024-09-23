import axios from 'axios';

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
