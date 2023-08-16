import { useEffect, useState } from 'react';
import { SimpleTheme, DetailTheme, Theme } from '../styles/theme';
import { useAppSelector } from './reduxHook';

export const useMode = () => {
  const [theme, setTheme] = useState<Theme>(SimpleTheme);
  const userSetting = useAppSelector((state) => state.user.userSetting);
  const userTheme = userSetting.usersettingScreenType === 0 ? DetailTheme : SimpleTheme;

  const setMode = (mode: Theme) => {
    mode === SimpleTheme
      ? window.localStorage.setItem('theme', 'simple')
      : window.localStorage.setItem('theme', 'detail');
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === SimpleTheme) {
      setMode(DetailTheme);
    } else {
      setMode(SimpleTheme);
    }
  };

  useEffect(() => {
    setMode(userTheme);
  }, [userSetting.usersettingScreenType]);

  return { theme, toggleTheme };
};