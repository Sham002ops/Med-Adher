import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { SplashScreenController } from '../src/components/SplashScreenController';
import "../global.css"
export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(auth)" 
        options={{ headerShown: false, presentation: 'modal' }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
        redirect={!isAuthenticated}
      />
    </Stack>
  );
}
