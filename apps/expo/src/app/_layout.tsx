import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Koulen_400Regular, useFonts } from '@expo-google-fonts/koulen'

import { TRPCProvider } from '~/utils/api'

import 'expo-dev-client'
import '~/styles.css'

import { View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider } from '@clerk/clerk-expo'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import GlobalContextProvider from '~/context/global-context'

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
  /* themes */
  // const { colorScheme } = useColorScheme()

  /* fonts */
  let [fontsLoaded] = useFonts({
    Koulen_400Regular,

    /*  */
  })

  if (!fontsLoaded) return null

  return (
    <TRPCProvider>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <BottomSheetModalProvider>
          <GlobalContextProvider>
            <StatusBar style="auto" />
            {/* Splitter */}

            <RootLayoutBottomNav />
          </GlobalContextProvider>
        </BottomSheetModalProvider>
      </ClerkProvider>
    </TRPCProvider>
  )
}

function RootLayoutBottomNav() {
  // const router = useRouter()
  /* Our main navigation here (idk what is best practices here :<) */
  return (
    <Stack>
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
