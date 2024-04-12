// FOLLOWING ALONG THESE TWO PAGES:
// PKCE Auth: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
// Requesting Web API Data: https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

import {makeRedirectUri} from 'expo-auth-session' // For return uri

// Public id, not too dangerous i think
const clientId = "b141ac3691f44bc0a508538e1c888ebf"; // in .env, find way to use from there?

// This is where the user will be redirected after authenticating spotify
const redirectUri = makeRedirectUri({
    scheme: 'expo',
    path: 'redirect'
}); 

// This specifies what data we'd like to retrieve from Spotify Web API
// Documentation: https://developer.spotify.com/documentation/web-api/concepts/scopes
const scope = "user-read-currently-playing"; // Space delimited within quotes

// This is the returned URL. Should have a code if valid, else we know we have to request a new access token
const params = new URLSearchParams(window.location.search); // Use local memory to avoid infinite auth loop
const code = params.get("code");

// If user declines the request, we get an error field back. Refer to documentation
// TODO: IMPLEMENT AFTERWARDS, GET FUNCTIONAL FIRST

// TODO: DEALING WITH REFRESH TOKEN/NEW ACCESS TOKENS: TRACK THE TIME 
// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens

if (!code) {
    // Hasn't verified nor generated a code yet. Send to auth
    redirectToAuthCodeFlow(clientId);
} else {
    // We have the url and code stored so just get information
    const accessToken = await getAccessToken(clientId, code);
    const trackData = await fetchCurrentlyPlayingTrack(accessToken);
    // Now populate and push to the database
}

// Send user to authentication to create a verifier
async function redirectToAuthCodeFlow(clientId: string) {
    // Creating the code challenge.
    // verifierString -> codeChallenge 
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");

    // TODO : GET MOBILE APP RETURN URL AND UPDATE THE APP TO HAVE THAT 
    params.append("redirect_uri", redirectUri); 
    // These are scopes; allow us to get different information. For sake of our app
    // just getting currently-playing-track, could potentially add functionality to get more stuff later.
    // There's also a scope for interacting with the track and what-not later on.
    params.append("scope", scope); 
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Generate high-entropy random string between [43, 128] chars in length
function generateCodeVerifier(length: number) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Generates our code challenge (base64 representation of hashed codeVerifier)
async function generateCodeChallenge(codeVerifier: string) {
    // This generates value from given string that got encoded 
    // codeVerifier(string) -> uint8array to be hashed using SHA-256
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    // This returns the base64 representation of our hash
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Actually gets our accessToken for use
async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier"); // Stored in auth

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

// Use everything we've made thus far to actually get information 
async function fetchCurrentlyPlayingTrack(token: string){
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    });

    // Data retrieved: https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track

    // Error check the response.status really quickly
    if(result.status == 200 ) return result.json;
    else{
        //Error case. Just return null 
        throw new Error("Unable to fetch currently playing track. Code: " + result.status);
    }
}