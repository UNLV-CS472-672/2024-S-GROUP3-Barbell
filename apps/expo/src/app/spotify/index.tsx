import Spotify from 'apps/expo/src/components/spotify/spotify'
import { router } from 'expo-router'
import { View, SafeAreaView, Dimensions, StyleSheet, Text } from 'react-native'


// To figure out the return uri
import { makeRedirectUri } from 'expo-auth-session';

//import SpotifyLoginButton from '../../utils/spotifyToken';

import { TestCode } from '../../components/spotify/spotifyToken';
import {LoginSpotifyButton} from '../../components/spotify/spotifyToken';


export default function SpotifyScreen() {
    // This whole file is just to display the widget but getting it in the middle is a battle.

    // TODO: update inputID to use a dynamic userID when possible. For now this is what we have tho. Just testing using ID of 1
    let userID: number = 6;

    // To figure out what the returnURI is:
    // let returnURI = makeRedirectUri({
    //     scheme: 'expo',
    //     path: 'redirect'
    // });
    // GOT: exp://192.168.0.11:8081/~/redirect

    // Testing. Should be bad first

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <Spotify inputID={userID} />
            <LoginSpotifyButton/>
            <TestCode/>
        </View>
    )
}