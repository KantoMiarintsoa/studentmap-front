import { z } from "zod";

export const addEventSchema = z.object({
    name: z.string().min(2, "Le nom est requis"),
    description: z.string().min(2, "La description est requise"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date de début invalide",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date de fin invalide",
    }),
    location: z.string().min(2, "Le lieu est requis").optional(),
    capacity: z.number().positive("La capacité doit être positive").optional(),
    registration_available: z.boolean().optional(),
    registration_link: z.string().url("Le lien d’inscription doit être une URL valide").optional(),
    image: z
        .any()
        .refine((file) => file instanceof File || file?.[0] instanceof File, {
            message: "Veuillez sélectionner une image valide.",
        }), universityId: z.number().int("ID d’université invalide").optional(),
    userId: z.number().int("ID d’utilisateur invalide").optional(),
});

export type EventFormData = z.infer<typeof addEventSchema>;
