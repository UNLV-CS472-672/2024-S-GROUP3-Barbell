import { makeRedirectUri } from 'expo-auth-session'

export const spotifyCredentials = {
  clientID: process.env.EXPO_PUCLIC_SPOTIFY_CLIENT_ID ?? '',
  clientSecret: process.env.EXPO_PUCLIC_SPOTIFY_CLIENT_SECRET ?? '',
  redirectUri: makeRedirectUri({
    scheme: 'expo',
    path: 'redirect',
  }), // Got this from using makeRedirectUri
}

// When app is ready to be deployed, store credentials on server and expose endpoints
// that make API calls for client and passes data back to the front-end

// Make server side route for this? Talk to T about it later

// MAKE SURE TO MAKE THIS SAFE LATER ON

/**
 * Global FontAwesome5 icon sizes
 *
 * Feel free to adjust as necessary, but check the other
 * referencing components to ensure a different size doesn't
 * break the layout.
 * */
export const FA = {
  reg: 26,
  lg: 32,
  xl: 48,
}

export const ACTIVITY_FEED_ITEM_LIMIT = 10
