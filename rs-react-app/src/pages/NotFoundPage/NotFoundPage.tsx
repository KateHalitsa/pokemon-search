import Link from 'next/link';
import './NotFoundPage.css'
import { useTranslations, useLocale } from "next-intl";

export default function NotFoundPage() {
    const t = useTranslations("NotFound");
    const locale = useLocale(); 

  return (
    <div className="notFound">
      <h1>404</h1>

      <h2>{t("title")}</h2>

      <p>
        {t("description")}
      </p>

      <Link href={`/${locale}/pokemon-search/search`}>
        {t("link")}
      </Link>
    </div>
  );
}