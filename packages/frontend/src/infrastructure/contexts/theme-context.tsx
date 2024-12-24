import { createContext, FC, useContext, useState } from "react";
import { THEME_KEY } from "../consts/local-storage-keys";

interface IThemeContext {
  darkTheme: boolean;
  toggleTheme: () => void;
}

interface IThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext>({
  darkTheme: true,
  toggleTheme: () => {},
});

const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const theme = localStorage.getItem(THEME_KEY) == "dark" ? true : false;
  const [darkTheme, setDarkTheme] = useState(theme);

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => {
      const newState = !prevState;
      if (newState) {
        localStorage.setItem(THEME_KEY, "dark");
      } else {
        localStorage.setItem(THEME_KEY, "light");
      }

      return newState;
    });
  };

  const value = {
    darkTheme,
    toggleTheme: toggleThemeHandler,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext) as IThemeContext;

export default ThemeProvider;
