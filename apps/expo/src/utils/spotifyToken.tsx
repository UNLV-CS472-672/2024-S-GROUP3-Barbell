// USING THIS AUTH FLOW: https://developer.spotify.com/documentation/web-api/tutorials/code-flow

import * as React from 'react'
import { Button } from 'react-native'
import { AccessTokenRequest, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

import { spotifyCredentials } from './spotifyCreds'

WebBrowser.maybeCompleteAuthSession()

const scopeArray: string[] = ['user-read-currently-playing']

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
}


// NEED TO CREATE ASYNC STORAGE TO BE ABLE TO HANDLE THINGS BETWEEN SPOTIFY API CALLS

// // Not using PKCE flow, uses default auth flow. 
// export default function SpotifyLoginButton() {  
//   const credentials = spotifyCredentials
  

//   React.useEffect(() => {
//     // Result of session: https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionresult
    
//   }, [response])

//   return (
//     <Button
//       disabled={!request}
//       title='Login'
//       onPress={() => {
//         promptAsync()
//       }}
//     />
//   )
// }

// Getting an authorization code now. PLEASE PLEASE 
export const getAuthCode = async (authenticated: Boolean) => {
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