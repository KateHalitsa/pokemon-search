import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] =
    useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light'
        ? 'dark'
        : 'light'
    );
  };

  useEffect(() => {
  document.body.classList.remove(
    'light',
    'dark'
  );

  document.body.classList.add(theme);
}, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}
    
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider'
    );
  }

  return context;
}