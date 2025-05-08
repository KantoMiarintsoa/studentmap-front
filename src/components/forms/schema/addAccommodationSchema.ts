import { z } from "zod";

export const addAccommodationSchema = z.object({
    name: z.string().min(1, { message: "Le nom est requis." }),
    address: z.string().min(1, { message: "L'adresse est requise." }),
    area: z
        .number({ invalid_type_error: "La surface doit être un nombre." })
        .positive({ message: "La surface doit être positive." }),
    receptionCapacity: z.string().min(1, { message: "La capacité d'accueil est requise." }),
    IsAvailable: z.boolean().optional(),
    rentMin: z
        .number({ invalid_type_error: "Le loyer minimum doit être un nombre." })
        .nonnegative({ message: "Le loyer minimum ne peut pas être négatif." }),
    rentMax: z
        .number({ invalid_type_error: "Le loyer maximum doit être un nombre." })
        .nonnegative({ message: "Le loyer maximum ne peut pas être négatif." }),
    currency: z.string().min(1, { message: "La devise est requise." }).default("Ar"),
    media: z.any().optional(),
    type: z.string().min(1, { message: "Le type de logement est requis." }),

    ownerId: z
        .number({ invalid_type_error: "L'identifiant du propriétaire doit être un nombre." })
        .int()
        .positive()
        .optional(),
});

export type addAccommodationFormData = z.infer<typeof addAccommodationSchema>;
