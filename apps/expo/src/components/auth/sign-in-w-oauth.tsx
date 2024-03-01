import React from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router';

import { useWarmUpBrowser } from '~/hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
    // redirectUrl: '/', 
  })
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: 'oauth_facebook',
    // redirectUrl: '/',
  })
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: 'oauth_apple',
    // redirectUrl: '/',
  })

  const onPressOAuth = React.useCallback(async (provider: string) => {
    try {
      const startOAuthFlow =
        provider === 'google'
          ? startGoogleOAuthFlow
          : provider === 'facebook'
            ? startFacebookOAuthFlow
            : startAppleOAuthFlow

      const { createdSessionId, setActive } = await startOAuthFlow()


      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId })

        // so it naviagates back here, but it doesnt reg that,
        // router.push('/'); // Router push to the landing page
      } else {
        // Handle the case where additional steps are needed
      }
    } catch (err: any) {
      Alert.alert(
        'OAuth Error',
        `An error occurred during the OAuth process: ${err.message || err}`,
      )
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        onPress={() => onPressOAuth('google')}
      />
      <Button
        title="Sign in with Facebook"
        onPress={() => onPressOAuth('facebook')}
      />
      <Button
        title="Sign in with Apple"
        onPress={() => onPressOAuth('apple')}
      />
    </View>
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

export default SignInWithOAuth
