import { useEffect } from 'react';
import { Stack, router, useSegments } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function RootLayout() {
  const { token } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!token && inAuthGroup) {
      router.replace('/login');
    } else if (token && !inAuthGroup && segments[0] !== undefined) {
      if (segments[0] === 'login' || segments[0] === 'signup') {
        router.replace('/(tabs)');
      }
    }
  }, [token, segments]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="habit/[id]" options={{ title: 'Detalhes do Hábito' }} />
    </Stack>
  );
}