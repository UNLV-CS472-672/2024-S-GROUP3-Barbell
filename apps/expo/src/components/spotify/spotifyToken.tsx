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
      if(code != undefined){
        SecureStore.setItem("code", code);
        console.log("We are here now and we stored code: " + code);  
      }
      
    }
  }, [response])

  // Runs promptAsync() which updates response and thus invokes the hook above
  // Button should only be available if 
  return (
    <Button
      disabled={localCode === null}
      title='Login to Spotify'
      onPress={() => {
        promptAsync()
      }}
    />
  )
}

// Just testing that button
export function TestCode(){
  const output = SecureStore.getItem("code");
  return(<Text>{output}</Text>)
}

// Getting an authorization code now. PLEASE PLEASE 
// Not really in use right now.
const getAuthCode = async (authenticated: Boolean) => {
  console.log("In auth function!");
  try{
    console.log("Attempting auth!")
    const credentials = spotifyCredentials;
    const redirectUri = makeRedirectUri({
      scheme: 'expo',
      path: 'redirect',
    })
    // Start auth session
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: credentials.clientID,
        scopes: scopeArray,
        // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: makeRedirectUri({
          scheme: 'expo',
          path: 'redirect',
        }),
      },
      discovery,
    )
    console.log("Got past the authRequest!");
    console.log("Request: ", request)
    console.log("Response: ", response);
    console.log("PromptAsync: ", promptAsync);

    // See if we have anything stored already. If we do, then invoke prompt, otherwise dont
    if(!authenticated){

    }else{
      // Already authenticated, so we should just have the data somewhere. Just return it
      // using our local storage.
    }
    if (response?.type === 'success') {
      const { code } = response.params
      console.log('code', code)
      
      // Now get access token
      const accessToken = undefined;
      if(code != null){const accessToken = getTokens(code!);}
      console.log("Access token: " + accessToken + '\n');
      return response.params;
    }
    else if(response?.type === 'cancel'){
      console.log("User cancelled login.\n");
    }

  }catch(e){ console.log("Error: " + e);}

}

// Each one is valid for only an hour, 3600 seconds.
// Recall unix is in milliseconds
// Recall not PKCE
const getTokens = async (code: string) => {
  console.log("Code2: " + code);
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
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    // await setUserData('accessToken', accessToken);
    // await setUserData('refreshToken', refreshToken);
    // await setUserData('expirationTime', expirationTime);
    return accessToken;
  } catch (err) {
    console.error(err);
  }
}