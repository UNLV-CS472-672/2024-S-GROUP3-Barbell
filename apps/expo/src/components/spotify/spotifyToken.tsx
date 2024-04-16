// USING THIS AUTH FLOW: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

import * as React from 'react'
import { Button, Text } from 'react-native'
import { AccessTokenRequest, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as SecureStore from 'expo-secure-store'

import { spotifyCredentials } from './spotifyCreds'
import { useAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()

const scopeArray: string[] = ['user-read-currently-playing']

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

// Actual login button to be displayed on a page
// Whole point is to prompt login and return an auth code if they accept.
// Else return something else to indicate nothing was done. To store stuff in
// local storage when generating data (another component)
export function LoginSpotifyButton(){
  const credentials = spotifyCredentials; 
  const returnUri = makeRedirectUri({
    scheme: 'expo',
    path: 'redirect'
  })

  // Start the authSession hook to give us promptAsync for use in the button
  const [request, response, promptAsync] = useAuthRequest({
    clientId: credentials.clientID,
    scopes: scopeArray,
    usePKCE: false, //We not doing all that right now
    redirectUri: makeRedirectUri({
      scheme: 'expo',
      path: 'redirect'
    })
  }, discovery)

  let localCode = SecureStore.getItem("code");



  // Hook to use and return the results from promptAsync()
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      // Now store it. 
      if((code != undefined) && (SecureStore.getItem("code")===undefined || SecureStore.getItem("code")===null)){
        SecureStore.setItem("code", code);
      }else if(code == undefined){
        console.log("No valid code :<");
      }else{
        console.log("Valid code but already stored? How did we get here?");
      }
      // Now check if we need to get the new refresh and access tokens
      
    }
  }, [response])

  // Runs promptAsync() which updates response and thus invokes the hook above
  // Button should only be available if localCode is null/undefined I think?
  return (
    <Button
      disabled={!(localCode === null || localCode===undefined)}
      title='Login to Spotify'
      onPress={() => {
        promptAsync()
      }}
    />
  )
}

// Step 2: Now that we have an auth code stored in SecureStorage.getItem("code")
// we can work on generating a refresh and access token. Two functions. 
//  1) Tokens init, get refresh and access first time. Only run when refresh doesn't already exist.
//  2) Use refresh. This one is done when we have the refresh already, and we use that token to get a new access token.
export async function getAccessToken(){
  // Make sure we need a token first too.

  // Just check to see which function to call.
  // If we don't have a refresh, we clearly don't have an access token either
  const refresh = SecureStore.getItem("refreshToken");
  if(refresh === undefined || refresh === null){
    // Get both tokens
    const authCode = SecureStore.getItem("code");
    if(!(authCode === null || authCode === undefined)){
      // Code exists, just call tokensInit with code
      return await tokensInit(authCode)
    }
    else{
      throw new Error("We somehow get into getAccessToken without an auth code anywhere?")
    }
  }
  else{
    // Refresh token so just invoke get access token with the refresh token
    const authCode = SecureStore.getItem("code");
    if(!(authCode === null || authCode === undefined)){
      // Code exists, just call tokensInit with code
      return await getAccessWithRefresh(refresh)
    }
    else{
      throw new Error("We somehow get into getAccessToken without an auth code anywhere?")
    }
  }
}

// This function grabs both tokens, only run when no refresh is there just yet.
// Each one is valid for only an hour, 3600 seconds.
// Recall unix is in milliseconds
// Recall not PKCE
async function tokensInit(code: string){
  if(code!=SecureStore.getItem("code")){
    // Mismatched from local storage to passed parameter
    throw new Error("Auth codes mismatch in token init. Local does not match passed argument.")
  }
  try {
    const credentials = spotifyCredentials
    const credsB64 = btoa(`${credentials.clientID}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${
        credentials.redirectUri
      }`,
    });
    const responseJson = await response.json();
    
    console.log(responseJson);
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      error: returnedError,
      error_description: errMsg
    } = responseJson;

    if(returnedError != undefined){
      //That means we had an error of sorts. 
      throw new Error("'" + returnedError + "' with description '" + errMsg +"'")
    }

    // Use it later on to check if our access token is out of wack.
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    SecureStore.setItem("accessToken", accessToken)
    SecureStore.setItem("refreshToken", refreshToken)
    // Stored as string. Must convert back into date time
    SecureStore.setItem("expirationTime", expirationTime.toString())
    return accessToken;
  } catch (err) {
    console.error(err);
  }
}

// This function just returns an access code 
async function getAccessWithRefresh(refreshToken: string){
  const refresh = SecureStore.getItem("refreshToken");
  if(!(refreshToken === refresh)){
    // Mismatch of locally stored token with that passed.
    throw new Error("Mismatched refresh tokens.");
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

  try{
    const credentials = spotifyCredentials
    const credsB64 = btoa(`${credentials.clientID}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        //client_id: credentials.clientID
      })
    });
    const responseJson = await response.json();

    // Just debugging and stuff
    console.log(responseJson);
    if(responseJson){
      const {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken
      } = responseJson

      // new expiration time of accessToken
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      SecureStore.setItem("accessToken", accessToken);
      SecureStore.setItem("expirationTime", expirationTime.toString())

      // Refresh token should remain the same I think?
      if(!(refreshToken === refresh)){
        throw new Error("Why did the refresh token change when refreshing our access token?");
      }
    }
  }
  catch(e){
    console.log(e);
  }
}

// Finally update the user data using an accessToken.
export async function getTrackData(){
  // Get local accessToken and expiration time. 
  // See if expired first. Could also be done by checking result of json, but we can just check the time anyways.
  const access = SecureStore.getItem("accessToken");
  console.log("Getting track data!");

  if(!(access === null || access === undefined)){
    console.log("We have this access token: " + access);
    const expTime = SecureStore.getItem("expirationTime");
    console.log("This token expires at: " + expTime);
  }else{
    console.log("No access token :<");
  }
}

// CURRENT BUG: Auth code expired but idk how to get a new one?
// Need a new authRequest I guess but idk how to do that.

// Very primitive logout function. It doesn't do anything useful really.
export async function logoutSpotify(){
  const auth = SecureStore.getItem("code");
  if(!(auth===null || auth === undefined)){
    console.log("Removing auth code: " + auth);
    const value = await SecureStore.deleteItemAsync("code");
    console.log("Finished deleting?")
    console.log(value);

    console.log("New auth code = " + SecureStore.getItem("code"));
  }
}