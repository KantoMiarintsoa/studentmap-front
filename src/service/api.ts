import { addUniversityFormData } from "@/components/forms/schema/addUniversity.shema";
import { RegisterFormData } from "@/components/forms/schema/register.schema";
import { UserUpdateFormData } from "@/components/forms/schema/updateUser.shema";
import { useAuth } from "@/components/providers/AuthProvider";
import { University } from "@/types/university";
import { Session, User, UserData } from "@/types/user";
import { Event } from "@/types/event";
import axios from "axios"
import { EventFormData } from "@/components/forms/schema/addEvent.schema";
import { addAccommodationFormData } from "@/components/forms/schema/addAccommodationSchema";
import { Accommodation } from "@/types/accommodation";
import { Graph } from "@/types/graph";
import { Total } from "@/types/dashboard";

export const API_URL = "http://localhost:3003"


const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

api.interceptors.request.use(async config => {

    try {
        const response = await axios.get("/api/auth/cookies");
        // const { session, status } = useAuth();



        if (response.status === 200 && response.data.session) {
            config.headers.Authorization = `Bearer ${response.data.session.token}`
        }
    }
    catch {

    }

    return config;
})

export const login = async (email: string, password: string) => {
    const response = await api.post<Session>("auth/login", { email, password })
    return response.data
}

export const register = async ({ confirmPassword, ...data }: RegisterFormData) => {
    const response = await api.post<UserData>("users/register", data);
    return response.data
}

export const getListUniversities = async () => {
    const response = await api.get<University[]>("university/lists");
    return response.data;
}

export const addUniversities = async (data: addUniversityFormData) => {
    const response = await api.post<University>("university/add", data)
    return response.data
}

export const detailUniversity = async (id: number) => {
    const response = await api.get<University>(`university/${id}/details`);
    return response.data;
}

export const editUniversity = async (id: number, data: Partial<addUniversityFormData>) => {
    const response = await api.put<University>(`university/${id}/update`, data)
    return response.data
}

export const deleteUniversity = async (id: number) => {
    const response = await api.delete<University>(`university/${id}/delete`)
}

export const editUser = async (id: number, data: Partial<UserUpdateFormData>) => {
    const response = await api.put<User>(`users/${id}/update`, data)
    return response.data
}
export const deleteUser = async (id: number) => {
    const response = await api.delete<User>(`users/${id}/delete`)
    return response.data
}

export const getListUsers = async () => {
    const response = await api.get<User[]>("users/lists")

    return response.data
}

export const detailsUser = async (id: number) => {
    const response = await api.get<UserData>(`users/${id}/details`)
    return response.data
}

export const addEvent = async (data: EventFormData) => {
    const response = await api.post<Event>("event/add", data)

    return response.data
}

export const getListEvent = async () => {
    const response = await api.get<Event[]>("event/lists");
    return response.data
}
export const updateEvent = async (id: number, data: EventFormData) => {
    const response = await api.put(`event/${id}/update`, data)
    return response.data
}
export const deleteEvent = async (id: number) => {
    const response = await api.delete(`event/${id}/delete`)
    return response.data
}


export const detailsEvents = async (id: number) => {
    const response = await api.get(`event/${id}/details`)
    return response.data
}

export const addAccommodation = async (data: addAccommodationFormData) => {
    const response = await api.post<Accommodation>("accommodation/add", data)
    return response.data
}
export const getListAccommodations = async () => {
    const response = await api.get<Accommodation[]>("accommodation/lists")

    return response.data
}

export const detailsAccommodation = async (id: number) => {
    const response = await api.get<Accommodation>(`accommodation/${id}/details`)
    return response.data
}
export const updateAccommodation = async (id: number, formData: addAccommodationFormData) => {
    const response = await api.put<Accommodation>(`accommodation/${id}/update`, formData)

    return response.data
}

export const deleteAccommodation = async (id: number) => {
    const response = await api.delete<Accommodation>(`accommodation/${id}/delete`)
    return response.data
}

export const getGraph = async () => {
    const response = await api.get<Graph>("dashboard/graph")
    return response.data
}

export const getDashboard = async () => {
    const response = await api.get<Total>("dashboard")

    return response.data
}

export const getOwnerLIst = async () => {
    const response = await api.get<User[]>("users/lists", {
        params: {
            role: "OWNER"
        }
    });
    return response.data
}
export default api;