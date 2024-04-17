// USING THIS AUTH FLOW: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

import * as React from 'react'
import { Button } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'

import { spotifyCredentials } from '~/utils/constants'
import { api } from '~/utils/trpc/api'


WebBrowser.maybeCompleteAuthSession()
// Can set scopes during API requests. Might have to generate a new auth code though.
// Logout -> Login again -> Make requests.
//    Handled easily by just invoking logout and then login/updateTrackData
const scopeArray: string[] = ['user-read-currently-playing', 'user-read-playback-state']

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

// Actual login button to be displayed on a page
// Whole point is to prompt login and set the auth code if they accept
export function SignInSpotify() {
  const credentials = spotifyCredentials
  // const returnUri = makeRedirectUri({
  //   scheme: 'expo',
  //   path: 'redirect'
  // })
  // Start the authSession hook to give us promptAsync for use in the button
  const [_, response, promptAsync] = useAuthRequest(
    {
      clientId: credentials.clientID,
      scopes: scopeArray,
      usePKCE: false, //We not doing all that right now
      redirectUri: makeRedirectUri({
        scheme: 'expo',
        path: 'redirect',
      }),
    },
    discovery,
  )

  // This is the code. If it returns undefined, no such code exists and thus authentication
  // has never happened before (or user logged out).
  let localCode = SecureStore.getItem('code')

  // Hook to use and return the results from promptAsync()
  // Has several cases. Refer to the following: https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionresult
  React.useEffect(() => {
    if (response?.type === 'success') {
      // Successful auth request.
      const { code } = response.params
      // Now store it. Check if code already existed first.
      if (!(code === undefined) && SecureStore.getItem('code') === undefined) {
        SecureStore.setItem('code', code)
      } else if (code === undefined) {
        throw new Error('Authentication code not generated during auth.')
      } else {
        /* Well, it does happen, session last login */
        // throw new Error("Auth code already existed. This shouldn't be able to happen.")
      }
    } else if (localCode === null || localCode === undefined) {
      // Auth was failed. See what error code it was
      console.log('Auth status not success, rather: ' + response?.type)
    } else {
      /* experimenting */
      console.log('Auth code already exists. No need to update `code`.')
    }
    // Now store it. Check if code already existed first.
  }, [response])

  // Runs promptAsync() which updates response and thus invokes the hook above
  // Button should only be available if localCode is null/undefined I think?
  return (
    <Button
      disabled={!(localCode === null || localCode === undefined)}
      title='Login to Spotify'
      onPress={() => {
        promptAsync()
      }}
    />
  )
}
