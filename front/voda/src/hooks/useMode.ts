import { useEffect, useState } from 'react';
import { SimpleTheme, DetailTheme, Theme } from '../styles/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAppSelector } from './reduxHook';

export const useMode = () => {
  const [theme, setTheme] = useState<Theme>(SimpleTheme);
  const userSetting = useAppSelector((state) => state.user.userSetting);
  const userTheme = userSetting.screenType === 0 ? DetailTheme : SimpleTheme;

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
  }, [userSetting.screenType]);

  return { theme, toggleTheme };
};