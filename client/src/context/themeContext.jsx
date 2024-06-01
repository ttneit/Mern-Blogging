import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();
const getInitTheme = () => {
  const initTheme = localStorage.getItem('theme')
  return initTheme ? JSON.parse(initTheme) :'light'
}
function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(getInitTheme);
  
  useEffect(() => {
    localStorage.setItem('theme',JSON.stringify(theme))
  },[theme]);
  const changeTheme = () => {
    setTheme(() => (theme === 'dark' ? 'light' : 'dark'));
    localStorage.getItem('theme',JSON.stringify(theme));
  };

  const value = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
