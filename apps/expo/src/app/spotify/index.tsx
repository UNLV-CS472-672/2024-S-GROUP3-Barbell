import Spotify from 'apps/expo/src/components/spotify/Spotify'
import { router } from 'expo-router'
import { View, SafeAreaView, Dimensions, StyleSheet } from 'react-native'

export default function SpotifyScreen() {
    // This whole file is just to display the widget but getting it in the middle is a battle.

    // NOTE: update inputID to use a dynamic userID when possible. For now this is what we have tho. Just testing using ID of 1

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <Spotify inputID={1} />
        </View>
    )
}