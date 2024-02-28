import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { TRPCProvider } from '~/utils/api'

import '~/styles.css'

import * as SecureStore from 'expo-secure-store'
import { ClerkProvider } from '@clerk/clerk-expo'
import { useColorScheme } from 'nativewind'

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

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme()

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f472b6',
            },
            contentStyle: {
              backgroundColor: colorScheme == 'dark' ? '#09090B' : '#FFFFFF',
            },
          }}
        />
        <StatusBar />
      </TRPCProvider>
    </ClerkProvider>
  )
}
