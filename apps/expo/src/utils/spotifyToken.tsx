// ENTIRELY REHASHED, DANG IT
// For now just include these guys 
import { spotifyCredentials } from "./spotifyCreds";
import * as AuthSession from "expo-auth-session";
import { encode as encodeUTF8 } from 'utf8'

// For getting tokens
import * as Crypto from 'expo-crypto';

import { encode as btoa } from 'base-64'


// HELPER FUNCTIONS FOR PKCE CODE CHALLENGE------------------------------
// Just generates a random string to be used to create a digest (SHA256)
const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = Crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Turns input string into SHA256 digest
const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, data)
}

// Transforms input string into base 64
const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
}
const codeVerifier  = generateRandomString(64);

const codeChallenge = async() => {
    const hashed = await sha256(codeVerifier);
    const CodeChallenge = base64encode(hashed);
};

const cChallenge = codeChallenge();
// Now we have the relevant info to get an authorization token and refresh token.

//-----------------------------------------------------------------------

// https://docs.expo.dev/guides/authentication/#spotify

// Start by authorizing the user through AuthSession from expo

// Scopes for what data to get: https://developer.spotify.com/documentation/web-api/concepts/scopes
// Can add more later as desired
const scopeArray = ['user-read-currently-playing'];

// For browser to ensure completion?
// DONT HAVE WEBBROWSER INSTALLED
//WebBrowser.maybeCompleteAuthSession();

// Endpoints
const discovery = {
    // Only one needed for useAuthRequest
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    // Not sure when used?
    tokenEndpoint: "https://accounts.spotify.com/api/token"
};

// Gives us the user authentication code through code challenge and OAuth (ISSUES)
export const getAuthorizationCode = async() => {
    const credentials = spotifyCredentials; // Implement safety later on with T
    const redirectUri = spotifyCredentials.redirectUri;

    // To be used as the config for useAuthRequest: https://docs.expo.dev/versions/latest/sdk/auth-session/#authrequestconfig

    /*
    Returns a loaded request, a response, and a prompt method in a single array in the following order:

    request - An instance of AuthRequest that can be used to prompt the user for authorization. 
    This will be null until the auth request has finished loading.

    response - This is null until promptAsync has been invoked. 
    Once fulfilled it will return information about the authorization.

    promptAsync - When invoked, a web browser will open up and prompt the user for authentication. 
    Accepts an AuthRequestPromptOptions object with options about how the prompt will execute.
    */
    // const [request, response, promptAysnc ] = AuthSession.useAuthRequest(
    //     {
    //         clientId: credentials.clientID,
    //         codeChallenge: CodeChallenge,
    //         codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    //         redirectUri: credentials.redirectUri,
    //         responseType: AuthSession.ResponseType.Code,
    //         scopes: scopeArray,
    //     }, 
    //     discovery);

    // const result = await promptAysnc();
    console.log(codeVerifier);
    console.log(cChallenge);
    console.log(scopeArray);
}

// Gets user refresh and access tokens.
// Access tokens expire every hour, so need refresh token to generate new access tokens.
const getTokens = async() => {
    try{
        const authCode = await getAuthorizationCode(); // Written above. Prompt user to get auth code.
        const credentials = spotifyCredentials;

    }
    catch(err){ console.log(err);}
}



