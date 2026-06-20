"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  if (!pathname) return null;

  const changeLocale = (nextLocale: "en" | "ru") => {
    const nextPath = pathname.replace(`/${locale}/`, `/${nextLocale}/`);
    router.push(nextPath);
  };

  return (
    <div>
      <button onClick={() => changeLocale("en")} disabled={locale === "en"}>
        en
      </button>
      <button onClick={() => changeLocale("ru")} disabled={locale === "ru"}>
        ru
      </button>
    </div>
  );
}