import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Cairo-Regular',
  fontSize: 18,
  fontWeight: '400' as const,
  letterSpacing: 0,
  lineHeight: 28,
};

const cairoFonts = {
  displayLarge: { ...fontConfig, fontSize: 57, lineHeight: 64 },
  displayMedium: { ...fontConfig, fontSize: 45, lineHeight: 52 },
  displaySmall: { ...fontConfig, fontSize: 36, lineHeight: 44 },
  headlineLarge: { ...fontConfig, fontSize: 32, lineHeight: 40 },
  headlineMedium: { ...fontConfig, fontSize: 28, lineHeight: 36 },
  headlineSmall: { ...fontConfig, fontSize: 24, lineHeight: 32 },
  titleLarge: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 22, lineHeight: 28 },
  titleMedium: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 18, lineHeight: 24 },
  titleSmall: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 16, lineHeight: 24 },
  labelLarge: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 18, lineHeight: 24 },
  labelMedium: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 16, lineHeight: 20 },
  labelSmall: { ...fontConfig, fontFamily: 'Cairo-Bold', fontSize: 14, lineHeight: 16 },
  bodyLarge: { ...fontConfig, fontSize: 18, lineHeight: 24 },
  bodyMedium: { ...fontConfig, fontSize: 16, lineHeight: 20 },
  bodySmall: { ...fontConfig, fontSize: 14, lineHeight: 16 },
};

export const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: cairoFonts }),
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A5F7A', // Deep blue, high contrast
    onPrimary: '#FFFFFF',
    secondary: '#227C9D',
    onSecondary: '#FFFFFF',
    error: '#D32F2F',
    onError: '#FFFFFF',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#111111',     // High contrast text
  },
};
