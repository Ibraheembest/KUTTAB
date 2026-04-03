import { useFonts as useExpoFonts } from 'expo-font';

export function useFonts() {
  const [fontsLoaded, fontError] = useExpoFonts({
    'Cairo-Regular': require('../../assets/fonts/Cairo-Regular.ttf'),
    'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
  });

  return { fontsLoaded, fontError };
}
