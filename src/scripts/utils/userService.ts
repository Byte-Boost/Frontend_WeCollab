import { MyJwtPayload } from "@/models/models";
import { jwtDecode } from "jwt-decode";

export async function getSessionUser() {
    const userToken: string = localStorage.getItem("token") || "";
    const decoded = jwtDecode<MyJwtPayload>(userToken);
    return decoded;
}