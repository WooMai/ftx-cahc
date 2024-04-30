import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'cn'];
export const localePrefix = "always"; // Default

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        messages: (await import(`../messages/${locale}.json`)).default
    };
});