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
      return await SecureStore.getItemAsync(key)
    } catch (err) {
      console.error('Error getting token:', err)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value)
    } catch (err) {
      console.error('Error saving token:', err)
      return
    }
  },
}

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  /* fonts */
  let [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) return null

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
  )
}

function RootLayoutBottomNav() {
  // const router = useRouter()
  /* Our main navigation here (idk what is best practices here :<) */
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{
          header: () => <View className='bg-background py-10'></View>,
        }}
      />
    </Stack>
  )
}
