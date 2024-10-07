import { getCookie } from 'cookies-next';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

interface MyJwtPayload extends JwtPayload {
  admin: boolean; 
}

export const isAuthenticated = (req: NextRequest) => {
    const headers = Object.fromEntries(req.headers.entries());
    // console.log('Request Headers:', headers);
    const token = getCookie('token', { req });
    // console.log('Token:', token);
    return token ? true : false;
}

export const isAuthenticatedAsAdmin = (req: NextRequest) => {
    const headers = Object.fromEntries(req.headers.entries());
    // console.log('Request Headers:', headers);
    const token = getCookie('token', { req });
    // console.log('Token:', token);
    if (token) {
        const decoded = jwtDecode<MyJwtPayload>(token);
        // console.log('Decoded Token:', decoded);
        return decoded.admin ? true : false;
    }
    return false;
}