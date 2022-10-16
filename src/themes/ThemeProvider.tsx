import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeContext from './ThemeContext';
import { Themes } from './Themes';

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dark, setDark] = useState(
    searchParams.get('dark') === 'false' ? false : true
  );
  const [selected, setSelected] = useState<string>(
    searchParams.get('theme') || 'neon'
  );

  const [theme, setTheme] = useState(
    calculateTheme(`${searchParams.get('theme')}`)[dark ? 'dark' : 'light']
  );

  const toggleDark = () => {
    setDark(!dark);
  };

  const selectTheme = (e: string) => {
    setSelected(e);
  };

  const switchTheme = useCallback(() => {
    return (
      navigate({ search: `?theme=${selected}&dark=${dark}` }),
      setTheme(calculateTheme(`${selected}`)[dark ? 'dark' : 'light'])
    );
  }, [selected, dark, navigate]);

  const matchLocation = useCallback(() => {
    return setTheme(
      calculateTheme(`${searchParams.get('theme')}`)[
        `${searchParams.get('dark')}` === 'true' ? 'dark' : 'light'
      ]
    );
  }, [searchParams]);

  useEffect(() => {
    matchLocation();
  }, [matchLocation]);

  useEffect(() => {
    switchTheme();
  }, [switchTheme]);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggleDark,
        selected,
        theme,
        selectTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const calculateTheme = (theme: string) => {
  if (theme == null) {
    return Themes.Neon;
  }

  switch (theme) {
    case 'neon':
      return Themes.Neon;
    case 'boba':
      return Themes.BobaTea;
    case 'earth':
      return Themes.Earth;
    case 'kirby':
      return Themes.Kirby;
    case 'retro':
      return Themes.Retro;
    case 'playstation':
      return Themes.Playstation;
    default:
      return Themes.Neon;
  }
};
