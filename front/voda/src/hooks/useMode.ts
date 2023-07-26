import { useEffect, useState } from 'react';
import { SimpleTheme, DetailTheme, Theme } from '../styles/theme';

export const useMode = () => {
  const [theme, setTheme] = useState<Theme>(SimpleTheme);

  const setMode = (mode: Theme) => {
    mode === SimpleTheme
      ? window.localStorage.setItem('theme', 'simple')
      : window.localStorage.setItem('theme', 'detail');
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === SimpleTheme ? setMode(DetailTheme) : setMode(SimpleTheme);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme !== null) {
      if (localTheme === 'simple') {
        setTheme(SimpleTheme);
      } else {
        setTheme(DetailTheme);
      }
    }
  }, []);

  return { theme, toggleTheme };
};