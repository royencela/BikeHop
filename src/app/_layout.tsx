import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { initDb } from "../services/tagStorage";

export default function RootLayout() {

  useEffect(() => {
    initDb().catch((e) => console.error('initDb failed', e))
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );

}