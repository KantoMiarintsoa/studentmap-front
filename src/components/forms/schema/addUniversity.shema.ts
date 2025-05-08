import { z } from "zod";
export const addUniversitiesShema = z.object({
    name: z.string().min(2, "le nom est requis"),
    description: z.string().min(2, "la description est requise"),
    city: z.string().min(2, "ville est requis"),
    webSite: z.string().url("Le site web doit être une URL valid"),
    mention: z.array(z.string().min(2, "metion est requise")),
    type: z.string().min(2, "mention est requise"),
    address: z.string().min(2, "adress est requias")
})

export type addUniversityFormData = z.infer<typeof addUniversitiesShema>
