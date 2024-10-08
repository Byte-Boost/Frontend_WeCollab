import { MyJwtPayload } from "@/models/models";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export async function getSessionUser() {
    const userToken: string = getCookie("token") || "";
    const decoded = jwtDecode<MyJwtPayload>(userToken);
    return decoded;
}