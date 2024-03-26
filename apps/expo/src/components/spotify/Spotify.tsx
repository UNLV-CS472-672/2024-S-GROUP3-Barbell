import { Dimensions, Image, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'

import { GlobalContext } from '~/context/global-context'
import { api } from '~/utils/api'

// Use to show the progress of the song using a bar
import SongProgress from 'apps/expo/src/components/spotify/song_progress'

export default function Spotify({inputID}: {inputID: number}) {
    // Should use this line instead for actual display
    const {data} = api.spotify.getSpotifyDataFromUserId.useQuery({id: inputID})

    if (data == null || data == undefined || data.isPlaying != true) {
    return (
        <View style={styles.WidgetBox}>
        <Text>No song playing.</Text>
        </View>
    )
    }

    let albumImageURL: string = data.albumImageURL ? data.albumImageURL : ''
    let songTitle: string = data.title ? data.title : ''
    let currTime: number = data.timePlayed? data.timePlayed : 0
    let totalTime: number = data.timeTotal? data.timeTotal:0
    let artists: string = data.artist? data.artist:''
    let album: string = data.albumName? data.albumName:''

    // Make a progress bar to display it: SongProgress handles time and progress bar
    // Should make a rotating weight plate for aesthetic reasons?

    return (
    <View style={styles.WidgetBox}>
        <Image
            source={{ uri: albumImageURL }}
            className='w-36 h-36'
        />

        <Text className=''>{songTitle} by {artists}</Text>
        <SongProgress progress={currTime} total={totalTime}/>
    </View>
    )
}

const styles = StyleSheet.create({
    // For the box holding the actual widget itself.
    WidgetBox: {
        flex: 1,
        width: 400,
        height: 100,
        color: 0xCACACA
    }
})