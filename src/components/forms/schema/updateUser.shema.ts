import { z } from "zod";

export const userUpdateSchema = z.object({
    firstName: z.string().min(2, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email({ message: "L'email est requis" }).readonly(),
    contact: z.string().optional(),
    profilePicture: z.string().optional(),
    oldPassword: z.string().min(6, "L'ancien mot de passe doit contenir au moins 6 caractères"),
    newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères").optional(),
    role: z.string().refine(
        data => ["STUDENT", "ADMIN", "OWNER", "ORGANIZER"].includes(data)
    ),
});

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
