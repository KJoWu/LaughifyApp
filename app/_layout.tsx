import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom Theme
const CustomTheme = {
  ...DefaultTheme, // Base it on the default theme
  colors: {
    ...DefaultTheme.colors,
    background: '#1F2937', // gray-900 background for the menu
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true, // Show the header
            headerTitle: 'RichLaughify', // Header text/logo
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFD700', // Gold color for a luxurious feel
            },
            headerStyle: {
              backgroundColor: '#1F2937', // Match menu background
            },
            headerShadowVisible: false, // Hides border for React Navigation
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
