import { createContext, FC, useContext, useState } from "react";

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
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleThemeHandler = () => {
    setDarkTheme((prevState) => !prevState);
  };

  const value = {
    darkTheme,
    toggleTheme: toggleThemeHandler,
  }

  return (
    <ThemeContext.Provider 
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext) as IThemeContext;

export default ThemeProvider;
