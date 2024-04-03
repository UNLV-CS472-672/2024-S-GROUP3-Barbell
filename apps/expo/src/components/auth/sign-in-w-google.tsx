import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'

import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

import { useGlobalContext } from '~/context/global-context'
import { useWarmUpBrowser } from '~/hooks/useWarmUpBrowser'
import { api } from '~/utils/api'
import { SignOut } from './sign-out'

WebBrowser.maybeCompleteAuthSession()

const SignInWithGoogle = () => {
  // flag used to enable/disable buttons
  const [isEnabled, setIsEnabled] = useState(true)
  const { setUserData: setGlobalContextUserData } = useGlobalContext()
  const createUserApi = api.user.create.useMutation()
  const { userId: clerkUserId } = useAuth()
  const { user: clerkUserData } = useUser()

  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })

  // TODO: Check that if an existing user signs up it wont create a new user
  // TODO: If clerk doesn't have a username, prompt them to create one
  // TODO: IF there is a failure with sign up it still shouldn't create a session

  // add mores strategies here
  const onSignInPressOAuth = React.useCallback(async () => {
    // check if the buttons can be used (currently enabled)
    if (isEnabled) {
      // disable all buttons and re-enable them after 0.5 seconds
      setIsEnabled(false)
      setTimeout(() => {
        setIsEnabled(true)
      }, 1000)

      try {
        const { createdSessionId, setActive } = await startGoogleOAuthFlow()
        console.log('startOAuthFlow')
        if (createdSessionId) {
          setActive?.({ session: createdSessionId })
          console.log('Session Id:', createdSessionId)
          console.log('User Id:', clerkUserId)
          router.back()
        } else {
          alert('Sign in failed')
        }
      } catch (err: any) {
        Alert.alert('OAuth Error', `An error occurred during the OAuth process: ${err.message || err}`)
        console.error('OAuth error', err)
      }
    }
  }, [])

  const createUser = () => {
    // If the user has an username use that, otherwise generate a random one
    const username = clerkUserData?.username
      ? clerkUserData.username
      : 'user' + uuidv4().slice(0, 13).replaceAll('-', '')

    if (clerkUserId && clerkUserData?.fullName) {
      const { data: existingUser } = api.user.byClerkId.useQuery({ clerkId: clerkUserId })
      // if (existingUser) {
      //   setGlobalContextUserData({
      //     id: existingUser.id,
      //     clerkId: existingUser.clerkId,
      //     username: existingUser.username,
      //     name: existingUser.name!,
      //   })
      //   return true
      // }
      createUserApi.mutate({
        clerkId: clerkUserId,
        username: username,
        name: clerkUserData.fullName,
      })
      // console.log('User created:', t)

      // if (!userId) {
      //   Alert.alert('Error', 'Could not sign up user. Please try again.')
      //   console.log("Couldn't get user id from the database")
      //   // deleteUserApi.mutate({ clerkId: clerkUserId })
      //   return false
      // }
      // setGlobalContextUserData({
      //   id: userId,
      //   clerkId: clerkUserId,
      //   username: username,
      //   name: clerkUserData.fullName,
      // })
    }

    if (!clerkUserData?.username) {
      // TODO: Send to create/edit user info screen
    }

    return true
  }

  const onSignUpPressOAuth = React.useCallback(async () => {
    // check if the buttons can be used (currently enabled)
    if (isEnabled) {
      // disable all buttons and re-enable them after 0.5 seconds
      setIsEnabled(false)
      setTimeout(() => {
        setIsEnabled(true)
      }, 1000)

      try {
        const { createdSessionId, setActive } = await startGoogleOAuthFlow()
        console.log('startOAuthFlow')
        if (createdSessionId) {
          setActive?.({ session: createdSessionId })
          console.log('Session Id:', createdSessionId)
          console.log('User Id:', clerkUserId)
          createUser()
          // if (!createUser()) {
          //   setActive?.({ session: null })
          // }
          router.back()
        } else {
          alert('Sign up failed')
        }
      } catch (err: any) {
        Alert.alert('OAuth Error', `An error occurred during the OAuth process: ${err.message || err}`)
        console.error('OAuth error', err)
      }
    }
  }, [])

  return (
    <>
      {/* TODO: Change these Buttons to my button component */}
      <TouchableOpacity
        disabled={!isEnabled}
        onPress={() => onSignInPressOAuth()}
        className="mb-4 rounded-xl bg-[#1C1B1B] py-1"
      >
        <Text className="font-koulen text-center text-xl font-semibold text-white">SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!isEnabled}
        onPress={() => onSignUpPressOAuth()}
        className="rounded-xl bg-[#48476D] py-1"
      >
        <Text className="font-koulen text-center text-xl font-semibold text-white">SIGN UP</Text>
      </TouchableOpacity>
      <SignOut />
    </>
  )
}

export default SignInWithGoogle
