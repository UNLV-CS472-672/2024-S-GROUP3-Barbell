import { useColorScheme } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TRPCProvider } from '@/apps/expo/src/api/api'
import { Koulen_400Regular, useFonts } from '@expo-google-fonts/koulen'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { UIProvider } from '~/provider/ui-provider'

import 'expo-dev-client'
import '~/styles.css'

import * as SecureStore from 'expo-secure-store'
import { ClerkProvider } from '@clerk/clerk-expo'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// import { useColorScheme } from 'nativewind'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  // themes
  const scheme = useColorScheme()

  // fonts
  let [fontsLoaded] = useFonts({
    Koulen_400Regular,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <TRPCProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <UIProvider>
          <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <BottomSheetModalProvider>
              <Stack />
              <StatusBar />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </UIProvider>
      </ClerkProvider>
    </TRPCProvider>
  )
}
