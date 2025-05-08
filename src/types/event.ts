import { University } from "./university";
import { User } from "./user";

export type Event = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    created_at: string;
    updated_at: string;
    location?: string;
    capacity?: number;
    registration_available?: boolean;
    registration_link?: string;
    image?: string;
    universityId: number;
    university: University;
    userId: number;
    user: User;
    // EventStudent: EventS[]; // Si vous avez un type `EventStudent` défini
};
