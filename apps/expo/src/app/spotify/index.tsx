import Spotify from 'apps/expo/src/components/spotify/spotify'
import { router } from 'expo-router'
import { View, SafeAreaView, Dimensions, StyleSheet, Text } from 'react-native'

// To figure out the return uri
import { makeRedirectUri } from 'expo-auth-session';

// To get track information from user while currently playing
import { fetchCurrentlyPlayingTrack } from '../../utils/spotifyToken'; 

export default function SpotifyScreen() {
    // This whole file is just to display the widget but getting it in the middle is a battle.

    // TODO: update inputID to use a dynamic userID when possible. For now this is what we have tho. Just testing using ID of 1
    let userID: number = 4;

    // To figure out what the returnURI is:
    let returnURI = makeRedirectUri({
        scheme: 'expo',
        path: 'redirect'
    });

    // Get current Spotify information. When should auth happen? For now just testing here.
    let songData = undefined; // TODO : IMPLEMENT THIS BUT CURRENTLY STUFF IS BUGGING OUT

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <Spotify inputID={userID} />
            <Text>returnURI</Text>
        </View>
    )
}