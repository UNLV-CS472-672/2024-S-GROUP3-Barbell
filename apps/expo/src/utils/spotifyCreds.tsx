import { makeRedirectUri } from "expo-auth-session"

export const spotifyCredentials = {
    clientID: "b141ac3691f44bc0a508538e1c888ebf",
    clientSecret: "b698fee6ccf04427b4ed49849e80ec06",
    redirectUri: makeRedirectUri({
        scheme: 'expo',
        path: 'redirect'
    }) // Got this from using makeRedirectUri
}

// When app is ready to be deployed, store credentials on server and expose endpoints
// that make API calls for client and passes data back to the front-end

// Make server side route for this? Talk to T about it later

// MAKE SURE TO MAKE THIS SAFE LATER ON 