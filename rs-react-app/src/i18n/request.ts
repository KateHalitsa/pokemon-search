import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "en";
  console.log("requestLocale:", locale);
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});