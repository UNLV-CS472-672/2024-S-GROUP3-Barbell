import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Koulen_400Regular, useFonts } from '@expo-google-fonts/koulen'

import { TRPCProvider } from '~/utils/trpc/api'

import 'expo-dev-client'
import '~/styles.css'

import { useEffect } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SplashScreen } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import {
  IstokWeb_400Regular,
  IstokWeb_400Regular_Italic,
  IstokWeb_700Bold,
  IstokWeb_700Bold_Italic,
} from '@expo-google-fonts/istok-web'
import {
  Sora_100Thin,
  Sora_200ExtraLight,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from '@expo-google-fonts/sora'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import AuthScreen from '~/app/auth'
import GlobalContextProvider from '~/context/global-context'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      console.error('Error getting token:', err)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      console.error('Error saving token:', err)
      return
    }
  },
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  /* fonts */
  const [loaded, error] = useFonts({
    Koulen_400Regular,
    /*  */
    IstokWeb_400Regular,
    IstokWeb_400Regular_Italic,
    IstokWeb_700Bold,
    IstokWeb_700Bold_Italic,
    /*  */
    Sora_100Thin,
    Sora_200ExtraLight,
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  })

  // Expo Router uses Error Boundaries
  // to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      {isDevelopment ? (
        <AppContent />
      ) : (
        <>
          <SignedIn>
            <AppContent />
          </SignedIn>
          <SignedOut>
            <AuthScreen />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  )
}

function AppContent() {
  return (
    <TRPCProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalContextProvider>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <StatusBar style='light' />

              {/* Splitter */}

              <RootLayoutBottomNav />
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </GlobalContextProvider>
      </GestureHandlerRootView>
    </TRPCProvider>
  )
}

/*  */
function RootLayoutBottomNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(dashboard)' />

      {/* new workout? workout view? */}
      <Stack.Screen name='(workout)' />

      {/* inbox */}
      <Stack.Screen name='(inbox)' />

      {/* friends */}
      <Stack.Screen name='(friends)' />

      {/* workout-completion */}
      <Stack.Screen name='workout-completion' />
    </Stack>
  )
}
