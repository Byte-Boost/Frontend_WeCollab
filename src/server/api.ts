import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:3200"
})

async function getUsers() {
    const response = await api.get("/users/login");
    const token = response.data;
    localStorage.setItem("login", JSON.stringify(token));
}
