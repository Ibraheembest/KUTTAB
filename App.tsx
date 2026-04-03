import React, { useEffect, useState } from 'react';
import { View, Text, I18nManager, StyleSheet, ActivityIndicator } from 'react-native';
import * as Updates from 'expo-updates';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from './src/hooks/useFonts';
import { theme } from './src/theme';
import { initDatabase } from './src/db/schema';
import { RootNavigator } from './src/navigation/RootNavigator';

// Force RTL at module-load time (before any render)
if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

export default function App() {
  const fontsLoaded = useFonts();
  const [isReady, setIsReady] = useState(false);
  const [dbError, setDbError] = useState<Error | null>(null);

  useEffect(() => {
    async function init() {
      // If RTL was just forced, reload the app to apply layout direction
      if (!I18nManager.isRTL) {
        await Updates.reloadAsync();
        return;
      }

      try {
        await initDatabase();
        setIsReady(true);
      } catch (e) {
        setDbError(e instanceof Error ? e : new Error(String(e)));
      }
    }
    init();
  }, []);

  // Loading state — use system font only (Cairo not yet loaded)
  if (!fontsLoaded || (!isReady && !dbError)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A5F7A" />
      </View>
    );
  }

  // Database error state
  if (dbError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>خطأ في قاعدة البيانات</Text>
        <Text style={styles.errorBody}>{dbError.message}</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorTitle: {
    fontFamily: 'Cairo-Bold',
    fontSize: 20,
    color: '#D32F2F',
    marginBottom: 8,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  errorBody: {
    fontFamily: 'Cairo-Regular',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
