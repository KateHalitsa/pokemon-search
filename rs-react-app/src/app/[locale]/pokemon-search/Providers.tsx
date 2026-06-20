"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "../../../context/ThemeContext";
import { store } from "../../../store/store";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
            <ErrorBoundary>
    
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>        </ErrorBoundary>

  );
}