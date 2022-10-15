export interface Theme {
  theme?: ThemeMode;
}

export interface ThemeMode {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  hover: string;
  glass: string;
}

export interface Props {
  Neon: {
    light: ThemeMode;
    dark: ThemeMode;
  };
  BobaTea: {
    light: ThemeMode;
    dark: ThemeMode;
  };
  Earth: {
    light: ThemeMode;
    dark: ThemeMode;
  };
  Kirby: {
    light: ThemeMode;
    dark: ThemeMode;
  };
  Retro: {
    light: ThemeMode;
    dark: ThemeMode;
  };
  Playstation: {
    light: ThemeMode;
    dark: ThemeMode;
  };
}

export const Themes: Props = {
  Neon: {
    light: {
      background: '#FCFCFC',
      primary: '#3E9A9E',
      secondary: '#FF6561',
      accent: '#FF6561',
      hover: '#ECFAFB',
      glass: 'rgba(252, 252, 252, 0.8)',
    },
    dark: {
      background: '#161427',
      primary: '#61FBFF',
      secondary: '#FC816D',
      accent: '#CDE57A',
      hover: '#292547',
      glass: 'rgba(22, 20, 39, 0.8)',
    },
  },
  BobaTea: {
    light: {
      background: '#FDD5BF',
      primary: '#161427',
      secondary: '#161427',
      accent: '#161427',
      hover: '#F2C4AB',
      glass: 'rgba(253, 213, 191, 0.8)',
    },
    dark: {
      background: '#161427',
      primary: '#FDD5BF',
      secondary: '#FDD5BF',
      accent: '#FDD5BF',
      hover: '#292547',
      glass: 'rgba(22, 20, 39, 0.8)',
    },
  },
  Earth: {
    light: {
      background: '#FCFCFC',
      primary: '#AF6C6F',
      secondary: '#AF6C6F',
      accent: '#AF6C6F',
      hover: '#FFEFF0',
      glass: 'rgba(252, 252, 252, 0.8)',
    },
    dark: {
      background: '#2C484B',
      primary: '#FDD5BF',
      secondary: '#FDD5BF',
      accent: '#FDD5BF',
      hover: '#3B6064',
      glass: 'rgba(44, 72, 75, 0.8)',
    },
  },
  Kirby: {
    light: {
      background: '#FCFCFC',
      primary: '#3275A8',
      secondary: '#E37293',
      accent: '#E37293',
      hover: '#EBF6FF',
      glass: 'rgba(252, 252, 252, 0.8)',
    },
    dark: {
      background: '#3275A8',
      primary: '#FCFCFC',
      secondary: '#F8E284',
      accent: '#F8E284',
      hover: '#3D8ECA',
      glass: 'rgba(50, 117, 168, 0.8)',
    },
  },
  Retro: {
    light: {
      background: '#F8E284',
      primary: '#C52B59',
      secondary: '#C52B59',
      accent: '#C52B59',
      hover: '#F1D768',
      glass: 'rgba(248, 226, 132, 0.8)',
    },
    dark: {
      background: '#C52B59',
      primary: '#F8E284',
      secondary: '#F8E284',
      accent: '#F8E284',
      hover: '#E54B79',
      glass: 'rgba(197, 43, 89, 0.8)',
    },
  },
  Playstation: {
    light: {
      background: '#FCFCFC',
      primary: '#2E6DB4',
      secondary: '#DF0024',
      accent: '#DF0024',
      hover: '#CCCCCC',
      glass: 'rgba(252, 252, 252, 0.8)',
    },
    dark: {
      background: '#161427',
      primary: '#2ADC95',
      secondary: '#DB8EC3',
      accent: '#FFE26C',
      hover: '#292547',
      glass: 'rgba(22, 20, 39, 0.8)',
    },
  },
};
