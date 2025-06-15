import { z } from "zod";

export const registerSchema = z.object({
    role: z.literal("ADMIN"),
    firstName: z.string().min(2, "le nom est requis"),
    lastName: z.string().min(1, "le prenom est requis"),
    email: z.string().email({ message: "email est requis" }),
    password: z.string().min(6, "le mot de paase doit contenir au moins 6 caracteres"),
    confirmPassword: z.string(),
    contact: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "les mots de passes ne correspondent pas",
    path: ["confirmPassword"],
})

export type RegisterFormData = z.infer<typeof registerSchema>;