"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "../../../context/ThemeContext";
import { store } from "../../../store/store";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";
import { useTranslations } from "next-intl";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
    const t = useTranslations("Error");

  return (
            <ErrorBoundary title={t("title")}
      message={t("reload")}>
    
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>        </ErrorBoundary>

  );
}