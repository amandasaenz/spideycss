import React from 'react';
import { Themes, ThemeMode } from './Themes';

interface IThemeContext {
  dark: boolean;
  theme: ThemeMode;
  selected?: string;
  toggleDark?: () => void;
  selectTheme?: (e: string) => void;
}

const defaultState = {
  dark: false,
  theme: Themes.Neon['light'],
};

const ThemeContext = React.createContext<IThemeContext>(defaultState);

export default ThemeContext;
