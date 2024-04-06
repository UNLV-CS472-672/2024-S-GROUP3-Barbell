import React from 'react'
import { View } from 'react-native'

import { useAuth } from '@clerk/clerk-expo'

import Button from '../ui/button/button'

export const SignOut = () => {
  const { isLoaded, signOut } = useAuth()

  if (!isLoaded) {
    return null
  }

  return (
    <View>
      <Button
        testID="sign-out-btn"
        color="dark"
        value="Sign Out"
        size="xl"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  )
}
