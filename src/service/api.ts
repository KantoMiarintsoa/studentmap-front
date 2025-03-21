import { RegisterFormData } from "@/components/forms/schema/register.schema";
import { Session, UserData } from "@/types/user";
import axios from "axios"

export const API_URL = "http://localhost:3003"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export const login = async (email: string, password: string) => {
    const response = await api.post<Session>("auth/login", { email, password })
    return response.data
}

export const register = async ({ confirmPassword, ...data }: RegisterFormData) => {
    const response = await api.post<UserData>("users/register", data);
    return response.data
}
export default api;

