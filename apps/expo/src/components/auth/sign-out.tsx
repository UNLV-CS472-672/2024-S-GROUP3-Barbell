import React from 'react'
import { View } from 'react-native'

import { useAuth } from '@clerk/clerk-expo'
import Button from '~/components/ui/button/button'

export const SignOut = () => {
  const { isLoaded, signOut } = useAuth()

  if (!isLoaded) {
    return null
  }

  const onSignOutPress = async () => {
    try {
      await signOut()
    } catch (err: any) {
      /* istanbul ignore next*/
      console.log('Error:> ' + err?.status || '')
      /* istanbul ignore next*/
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err)
    }
  }

  return (
    <View>
      <Button
        testID='sign-out-btn'
        color='dark'
        value='Sign Out'
        size='xl'
        onPress={() => {
          // signOut()
          onSignOutPress()
        }}
      />
    </View>
  )
}
