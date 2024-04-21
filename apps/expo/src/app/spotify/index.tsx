import React from 'react'
import { Alert, Button, View } from 'react-native'

import Spotify from 'apps/expo/src/components/spotify/spotify'

import { SignInSpotify } from '~/components/spotify/sign-in-spotify'
import { SignOutSpotifyButton } from '~/components/spotify/sign-out-spotify'
import useUpdateSpotify from '~/hooks/useUpdateSpotify'

const SpotifyScreen = () => {
  const userID = 6 // This could eventually be dynamic based on user login.

  const { handleUpdateData } = useUpdateSpotify(userID)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spotify inputID={userID} />
      <SignInSpotify />
      <SignOutSpotifyButton />
      <Button
        title='Update Spotify Data'
        onPress={async () => {
          console.log('Updating Spotify data.')
          handleUpdateData()
          console.log('Spotify data updated.')
        }}
      />
    </View>
  )
}

export default SpotifyScreen
