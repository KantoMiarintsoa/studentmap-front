"use server";

import { cookies } from "next/headers";

export const changeLocaleAction = async (locale: string) => {
    const locales = ["en", "fr"];

    if (!locales.includes(locale))
        return;

    const cookieStore = await cookies();
    cookieStore.set("locale", locale);

    return;
}