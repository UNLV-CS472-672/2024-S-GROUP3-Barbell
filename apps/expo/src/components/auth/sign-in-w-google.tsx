import React, { useState } from 'react'
import { Alert, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { useOAuth } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'

import 'react-native-get-random-values'

import { useWarmUpBrowser } from '~/hooks/useWarmUpBrowser'
import Button from '../ui/button/button'

WebBrowser.maybeCompleteAuthSession()

const SignInWithGoogle = () => {
  const [isEnabled, setIsEnabled] = useState(true)

  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })

  // TODO: If clerk doesn't have a username, prompt them to create one

  const SignInWithGoogleOAuth = React.useCallback(async () => {
    if (isEnabled) {
      setIsEnabled(false)

      try {
        const { createdSessionId, setActive } = await startGoogleOAuthFlow()
        console.log('startOAuthFlow')

        if (createdSessionId) {
          setActive?.({ session: createdSessionId })
        } else {
          // TODO: Change this to a toast or style this alert
          alert('Sign in failed')
        }
      } catch (err: any) {
        Alert.alert('OAuth Error', `An error occurred during the OAuth process: ${err.message || err}`)
        console.error('OAuth error', err)
      }
      setIsEnabled(true)
    }
  }, [])

  return (
    <Button
      onPress={() => SignInWithGoogleOAuth()}
      disabled={!isEnabled}
      color="dark"
      className="flex flex-row items-center justify-center gap-x-2"
    >
      <AntDesign name="google" size={24} color="white" />
      <Text className="font-koulen text-center text-lg font-semibold text-white">Sign in with Google</Text>
    </Button>
  )
}

export default SignInWithGoogle
