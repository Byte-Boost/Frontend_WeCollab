import axios from 'axios';
import {  getCookie } from 'cookies-next';
import { jwtDecode, JwtPayload } from 'jwt-decode'; 


// Axios configuration
const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_IP,
  timeout: 30000,
};

interface MyJwtPayload extends JwtPayload {
  id: string,
  username: string,
  role: string,
  admin: string
}


// Create an axios instance
const instance = axios.create(axiosConfig);
console.log(instance.defaults.baseURL);
// Add a request interceptor
instance.interceptors.request.use((config) => {
  const userToken = getCookie("token"); 
  if (userToken){
    const decoded = jwtDecode<MyJwtPayload>(userToken);
  }
  // Get the authorization value  
  const authorizationValue = 'bear ' + userToken;

  // Add the Authorization header
  config.headers.Authorization = authorizationValue;

  return config;
});

export default instance;



