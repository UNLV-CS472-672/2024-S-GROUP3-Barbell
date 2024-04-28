import React, { useState } from 'react'
import { Alert, Text } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { useOAuth } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'
import { useWarmUpBrowser } from '~/hooks/useWarmUpBrowser'
import { getBaseUrl } from '~/utils/trpc/api'

/* istanbul ignore next*/
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
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow({
        // redirectUrl: '/oauth-native-callback',
      })

      console.log(getBaseUrl(), 'getBaseUrl')

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })

        // FIXME:  WARN  The navigation state parsed from the URL contains routes not present in the root navigator.
        // This usually means that the linking configuration doesn't match the navigation structure.
        // See https://reactnavigation.org/docs/configuring-links for more details on how to specify a linking configuration.
      } else {
        // FIXME: Change this to a toast or style this alert
        alert('Sign in failed')
      }
    } catch (err: any) {
      Alert.alert(
        'OAuth Error',
        `An error occurred during the OAuth process: ${err.message || err}`,
      )
    }
  }, [])

  return (
    /* istanbul ignore next*/
    <Button
      testID='sign-in-with-google-btn'
      onPress={() => SignInWithGoogleOAuth()}
      disabled={!isEnabled}
      className='flex flex-row items-center justify-center gap-x-2 bg-[#de5246]'
    >
      <AntDesign name='google' size={24} color='white' />
      <Text className='font-koulen text-center text-lg font-semibold text-white'>
        Sign in with Google
      </Text>
    </Button>
  )
}

export default SignInWithGoogle
