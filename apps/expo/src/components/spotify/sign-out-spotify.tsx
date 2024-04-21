import React from 'react'
import { Button } from 'react-native'
import * as SecureStore from 'expo-secure-store'

// Very primitive logout function.
// Clear the login by clearing all tokens and stuff.
export async function logoutSpotify() {
  const auth = SecureStore.getItem('code')
  if (!(auth === undefined)) {
    try {
      await SecureStore.deleteItemAsync('code')
      await SecureStore.deleteItemAsync('refreshToken')
      await SecureStore.deleteItemAsync('accessToken')
      await SecureStore.deleteItemAsync('expirationTime')
    } catch (e) {
      console.log(e)
    }
  } else {
    throw new Error('User not logged in.')
  }
}

export function SignOutSpotifyButton() {
  // Button to trigger the logout process
  const handleLogout = async () => {
    try {
      await logoutSpotify()
      console.log('Logged out of Spotify successfully.')
      // Optionally add any other cleanup or navigation actions post logout
    } catch (error: any) {
      console.error('Logout failed:', error.message)
    }
  }

  return <Button title='Sign Out of Spotify' onPress={handleLogout} />
}
