import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'

import { useWarmUpBrowser } from '~/hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession()

const SignInWithGoogle = () => {
  // flag to enable/disable button
  let isEnabled = true;

  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })

  // add mores strategies here
  const onPressOAuth = React.useCallback(async () => {
    if (isEnabled) {
      // disable button, then re-enable in 0.5 seconds
      isEnabled = false;
      setTimeout(() => { isEnabled = true }, 500)

      try {
        const startOAuthFlow = startGoogleOAuthFlow
  
        const { createdSessionId, setActive } = await startOAuthFlow()
        console.log('startOAuthFlow')
  
        if (createdSessionId) {
          setActive?.({ session: createdSessionId })
          router.back()
        } else {
          alert('Sign in failed')
        }
      } catch (err: any) {
        Alert.alert(
          'OAuth Error',
          `An error occurred during the OAuth process: ${err.message || err}`,
        )
        console.error('OAuth error', err)
      }
    }
  }, [])

  return (
    <>
      <TouchableOpacity
        onPress={() => onPressOAuth()}
        className="mb-4 rounded-xl bg-[#1C1B1B] py-1"
      >
        <Text className="font-koulen text-center text-xl font-semibold text-white">
          SIGN IN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPressOAuth()}
        className="rounded-xl bg-[#48476D] py-1"
      >
        <Text className="font-koulen text-center text-xl font-semibold text-white">
          SIGN UP
        </Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Additional styles can be added here if needed
})

export default SignInWithGoogle
