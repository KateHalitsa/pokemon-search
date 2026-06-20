"use client";

import Link from "next/link";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("Navbar");
  const locale = useLocale(); 
console.log("locale in component:", locale);

  return (
    <nav className="navbar">
      <Link href={`/${locale}/pokemon-search/search`}>{t("search")}</Link>
      <Link href={`/${locale}/pokemon-search/about`}>{t("about")}</Link>

      <button className="theme-btn" onClick={toggleTheme}>
        {theme}
      </button>

      <LanguageSwitcher />
    </nav>
  );
}

export default Navbar;