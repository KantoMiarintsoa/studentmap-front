import { addUniversityFormData } from "@/components/forms/schema/addUniversity.shema";
import { RegisterFormData } from "@/components/forms/schema/register.schema";
import { UserUpdateFormData } from "@/components/forms/schema/updateUser.shema";
import { useAuth } from "@/components/providers/AuthProvider";
import { SearchParamsUniversity, University } from "@/types/university";
import { Session, User, UserData } from "@/types/user";
import { Event } from "@/types/event";
import axios from "axios"
import { EventFormData } from "@/components/forms/schema/addEvent.schema";
import { addAccommodationFormData } from "@/components/forms/schema/addAccommodationSchema";
import { Accommodation, SearchParams } from "@/types/accommodation";
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

export const exportPdf = async () => {
    const response = await api.get("export/pdf", {
        responseType: "blob",
    });
    return response;
};

export const register = async ({ confirmPassword, ...data }: RegisterFormData) => {
    const response = await api.post<UserData>("users/register", data);
    return response.data
}
export const registerAdmin = async ({ confirmPassword, ...data }: RegisterFormData) => {
    const response = await api.post<UserData>('users/add-admin', data)
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

export const searchAdvanceduniversity = async (params: SearchParamsUniversity) => {
    const query = new URLSearchParams();

    if (params.name) query.append('name', params.name);
    if (params.address) query.append('address', params.address);
    if (params.type) query.append('type', params.type);

    const response = await api.get<University[]>(`university/filter?${query.toString()}`);
    return response.data;
};


export const editUser = async (id: number, { newPassword, ...data }: Partial<UserUpdateFormData>) => {
    const response = await api.put<User>(`users/${id}/update`, { ...data, password: newPassword })
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

export const searchUser = async (firstName: string = ""): Promise<User[]> => {
    const response = await api.get<User[]>("users/search?firstName=" + firstName)
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

export const searchEventsByName = async (name: string) => {
    const response = await api.get<Event[]>("event/search?name=" + name)
    return response.data
}

// export interface addAccommodationFormData {
//     name: string;
//     address: string;
//     area: string;
//     receptionCapacity: number;
//     IsAvailable: boolean;
//     rentMin: number;
//     rentMax: number;
//     type: string;
//     media: {
//         images: File[];
//     };
//     ownerId: string;
// }

export const addAccommodation = async (data: addAccommodationFormData) => {
    if (!data.ownerId) {
        throw new Error("ownerId is required");
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("area", data.area.toString());
    formData.append("receptionCapacity", data.receptionCapacity);
    formData.append("IsAvailable", data.IsAvailable ? "true" : "false");
    formData.append("rentMin", data.rentMin.toString());
    formData.append("rentMax", data.rentMax.toString());
    formData.append("type", data.type);
    formData.append("ownerId", data.ownerId.toString());

    if (data.media && Array.isArray(data.media.images)) {
        data.media.images.forEach((file: File) => {
            formData.append("media", file);
        });
    }

    const response = await api.post("accommodation/add", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log(data)

    return response.data;
};





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

export const searchAdvancedAccommodation = async (params: SearchParams) => {
    const query = new URLSearchParams();

    if (params.name) query.append('name', params.name);
    if (params.address) query.append('address', params.address);
    if (params.type) query.append('type', params.type);
    if (params.budget !== undefined) query.append('budget', params.budget.toString());

    const response = await api.get<Accommodation[]>(`accommodation/search?${query.toString()}`);
    return response.data;
};


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

export const logout = async () => {
    const response = await api.post("auth/logout");
    return response.data;
};

export default api;