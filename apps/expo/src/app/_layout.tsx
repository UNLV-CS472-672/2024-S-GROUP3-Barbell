import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { Koulen_400Regular, useFonts } from '@expo-google-fonts/koulen'

import { TRPCProvider } from '~/utils/api'

import 'expo-dev-client'
import '~/styles.css'

import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import AuthScreen from '~/app/auth'
import GlobalContextProvider from '~/context/global-context'

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
  let [fontsLoaded] = useFonts({
    Koulen_400Regular,
  })

  if (!fontsLoaded) return null

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <SignedIn>
        <TRPCProvider>
          <GlobalContextProvider>
            <SafeAreaProvider>
              <BottomSheetModalProvider>
                <StatusBar style="light" />

                {/* Splitter */}

                <RootLayoutBottomNav />
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </GlobalContextProvider>
        </TRPCProvider>
      </SignedIn>

      <SignedOut>
        <AuthScreen />
      </SignedOut>
    </ClerkProvider>
  )
}

function RootLayoutBottomNav() {
  // const router = useRouter()
  /* Our main navigation here (idk what is best practices here :<) */
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          header: () => <View style={{ backgroundColor: '#1E1E1E' }} />,
        }}
      />
    </Stack>
  )
}
