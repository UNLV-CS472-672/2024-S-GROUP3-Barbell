// USING THIS AUTH FLOW: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

import { makeRedirectUri } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

export const spotifyCredentials = {
  clientID: process.env.EXPO_PUCLIC_SPOTIFY_CLIENT_ID ?? '',
  clientSecret: process.env.EXPO_PUCLIC_SPOTIFY_CLIENT_SECRET ?? '',
  redirectUri: makeRedirectUri({
    scheme: 'expo',
    path: 'redirect',
  }), // Got this from using makeRedirectUri
}

// Define the interface for the external URLs object
export interface ExternalUrls {
  spotify: string
}

// Define the interface for an artist
export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

// Define the interface for an image object
export interface Image {
  height: number
  url: string
  width: number
}

// Define the interface for an album
export interface Album {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface TrackItem {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface SpotifyData {
  timestamp: number
  context: any
  progress_ms: number
  item: TrackItem
  currently_playing_type: string
  actions: {
    disallows: {
      resuming: boolean
      toggling_repeat_context: boolean
      toggling_repeat_track: boolean
      toggling_shuffle: boolean
    }
  }
  is_playing: boolean
}

export interface SpotifyUserData {
  albumImageURL: string
  albumName: string
  artist: string
  isPlaying: boolean
  songURL: string
  title: string
  timePlayed: number
  timeTotal: number
  artistURL: string
  userID: number
}

// Step 1: This function grabs both tokens, only run when no refresh is there just yet.
// Each one is valid for only an hour, 3600 seconds.
// Recall unix is in milliseconds
// Recall not PKCE
export async function tokensInit(code: string) {
  if (code != SecureStore.getItem('code')) {
    // Mismatched from local storage to passed parameter
    throw new Error('Auth codes mismatch in token init. Local does not match passed argument.')
  }
  try {
    const credentials = spotifyCredentials
    const credsB64 = btoa(`${credentials.clientID}:${credentials.clientSecret}`)
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${credentials.redirectUri}`,
    })

    const responseJson = await response.json()

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      error: returnedError,
      error_description: errMsg,
    } = responseJson

    if (returnedError != undefined) {
      //That means we had an error of sorts.
      throw new Error("'" + returnedError + "' with description '" + errMsg + "'")
    }

    // Use it later on to check if our access token is out of wack.
    const expirationTime = new Date().getTime() + expiresIn * 1000
    SecureStore.setItem('accessToken', accessToken)
    SecureStore.setItem('refreshToken', refreshToken)
    // Stored as string. Must convert back into date time
    SecureStore.setItem('expirationTime', expirationTime.toString())
    return accessToken
  } catch (err) {
    console.error(err)
  }
}

// Step 2: Now that we have an auth code stored in SecureStorage.getItem("code")
// we can work on generating a refresh and access token. Two functions.
//  1) Tokens init, get refresh and access first time. Only run when refresh doesn't already exist.
//  2) Use refresh. This one is done when we have the refresh already, and we use that token to get a new access token.
export async function getAccessToken() {
  console.log('Getting access token')
  // Just check to see which function to call.
  // If we don't have a refresh, we clearly don't have an access token either
  const refresh = SecureStore.getItem('refreshToken')

  // If we don't have a refresh token, we need to get both tokens.
  if (refresh === undefined || refresh === null) {
    // Get both tokens
    const authCode = SecureStore.getItem('code')

    /*  */
    if (!(authCode === null || authCode === undefined)) {
      // Code exists, just call tokensInit with code
      return await tokensInit(authCode)
    } else {
      throw new Error('We somehow get into getAccessToken without an auth code anywhere?')
    }
  } else {
    // Refresh token so just invoke get access token with the refresh token
    // Make sure we need a token first too.
    const expTime = SecureStore.getItem('expirationTime')
    const currTime = new Date().getTime()
    let needToken: boolean = false
    if (!(expTime === null || expTime === undefined)) {
      needToken = currTime >= parseInt(expTime)
    }
    if (needToken) {
      const authCode = SecureStore.getItem('code')
      if (!(authCode === null || authCode === undefined)) {
        // Code exists, just call tokensInit with code
        return await getAccessWithRefresh(refresh)
      } else {
        throw new Error('We somehow get into getAccessToken without an auth code anywhere?')
      }
    } else {
      console.log('No new token needed! Not expired yet for: ', SecureStore.getItem('accessToken'))
    }
  }
}

// Step 2.5 This function just returns an access code via refresh
async function getAccessWithRefresh(refToken: string) {
  const refresh = SecureStore.getItem('refreshToken')
  if (!(refToken === refresh)) {
    // Mismatch of locally stored token with that passed.
    throw new Error('Mismatched refresh tokens.')
  }

  // Valid refresh token I think? I hope. Idk how local storage works anymore.
  // Anyways, make an HTTP request: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens

  // Send POST request with following parameters:
  //  grant_type: "refresh_token"
  //  refresh_token: refresh
  //  client_id: Only for PKCE so not important as of right now.

  // Header should include:
  //  Content-Type: application/x-www-form-urlencoded

  //  We use this for Authorization Code (our current flow): https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
  //  Authorization: "Authorization: Basic " + <base64 encoded client_id:client_secret

  try {
    console.log('Trying to get new access token!')
    const credentials = spotifyCredentials
    const credsB64 = btoa(`${credentials.clientID}:${credentials.clientSecret}`)
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refresh}`,
    })

    const responseJson = await response.json()

    // Just debugging and stuff
    console.log('New tokens based on refresh token')
    console.log(responseJson)
    if (responseJson) {
      const {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
      } = responseJson

      // new expiration time of accessToken
      const expirationTime = new Date().getTime() + expiresIn * 1000
      SecureStore.setItem('accessToken', accessToken)
      SecureStore.setItem('expirationTime', expirationTime.toString())
      console.log('The new access token expires at: ' + expirationTime)
    }
  } catch (e) {
    console.log(e)
  }
}

// Step: 0 Finally update the user data using an accessToken.
// Ensure this function converts SpotifyData to SpotifyUserData and returns it.
export async function getTrackData(): Promise<SpotifyUserData> {
  // We need to get access token first
  await getAccessToken()

  // That makes these lines not as important but we can keep em for now.
  const accessToken = await SecureStore.getItemAsync('accessToken')
  if (!accessToken) {
    throw new Error('Access Token is not available.')
  }

  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    if (response.status === 204) {
      throw new Error('No song is currently playing.')
    } else {
      const errorDetail = await response.json()
      throw new Error(`Spotify API responded with ${response.status}: ${errorDetail.error.message}`)
    }
  }

  const data: SpotifyData = await response.json()
  const trackItem = data.item

  return {
    albumImageURL: trackItem.album.images[0]?.url ?? '',
    albumName: trackItem.album.name,
    artist: trackItem.artists.map((artist) => artist.name).join(', '),
    isPlaying: data.is_playing,
    songURL: trackItem.external_urls.spotify,
    title: trackItem.name,
    timePlayed: Math.floor(data.progress_ms / 1000),
    timeTotal: Math.floor(trackItem.duration_ms / 1000),
    artistURL: trackItem.artists[0]?.external_urls.spotify ?? '',
    userID: -1,
  }
}

// Step: -1
// > This function updates the spotify data in the database
// > call update --> (try to) getTrackData --> (try to) getAccessToken
// >             --> (optional if token already generated) getAccessWithRefresh
// >             --> (if not generated, first login) tokensInit
