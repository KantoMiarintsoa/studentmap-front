import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {

    let locale = "fr";
    const locales = ["en", "fr"];

    const cookieStore = await cookies();
    const currentLocale = cookieStore.get("locale");

    if (currentLocale && locales.includes(currentLocale.value)) {
        locale = currentLocale.value;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
})