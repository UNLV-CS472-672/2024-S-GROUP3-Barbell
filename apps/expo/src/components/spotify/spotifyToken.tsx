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
  console.log("Starting auth!\n");
  const [request, response, promptAsync] = useAuthRequest({
    clientId: credentials.clientID,
    scopes: scopeArray,
    usePKCE: false, //We not doing all that right now
    redirectUri: makeRedirectUri({
      scheme: 'expo',
      path: 'redirect'
    })
  }, discovery)

  console.log("Done creating auth session.");

  let localCode = SecureStore.getItem("code");
  console.log("Local code: " + localCode);



  // Hook to use and return the results from promptAsync()
  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log("Where am I?\n");
      const { code } = response.params
      console.log('code', code)
      // Now store it. 
      if((code != undefined) && (SecureStore.getItem("code")===undefined || SecureStore.getItem("code")===null)){
        SecureStore.setItem("code", code);
        console.log("We are here now and we stored code: " + code);  
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
  // Just check to see which function to call.
  // If we don't have a refresh, we clearly don't have an access token either
  const refresh = SecureStore.getItem("refreshToken");
  if(refresh === undefined || refresh === null){
    // Get both tokens
    const authCode = SecureStore.getItem("code");
    if(!(authCode === null || authCode === undefined)){
      // Code exists, just call tokensInit with code
      console.log("Calling tokensInit with " + authCode);
      return await tokensInit(authCode)
    }
    else{
      throw new Error("We somehow get into getAccessToken without an auth code anywhere?")
    }
  }
  else{
    // Refresh token so just invoke get access token with the refresh token
    console.log("Getting access token with refresh token of: " + refresh);
    const authCode = SecureStore.getItem("code");
    if(!(authCode === null || authCode === undefined)){
      // Code exists, just call tokensInit with code
      console.log("Calling refresh function with " + authCode);
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
  console.log("Getting tokens for: " + SecureStore.getItem("code"))
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

}