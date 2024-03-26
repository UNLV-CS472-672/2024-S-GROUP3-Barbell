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
        <View>
        <Text>User is not actively listening to Spotify.</Text>
        </View>
    )
    }

    let albumImageURL: string = data.albumImageURL ? data.albumImageURL : ''
    let songTitle: string = data.title ? data.title : ''
    let currTime: number = data.timePlayed? data.timePlayed : 0
    let totalTime: number = data.timeTotal? data.timeTotal : 0
    let artists: string = data.artist? data.artist : ''
    let album: string = data.albumName? data.albumName : ''

    // Make a progress bar to display it: SongProgress handles time and progress bar
    // Should make a rotating weight plate for aesthetic reasons?

    return (
        <View style={{ width: 300}}>
            <Text style={{fontWeight: 'bold', height: 25}}>LISTENING TO SPOTIFY</Text>
            <View style={{flexDirection: 'row', height: 130, alignContent: 'center'}}>
                <Image
                    source={{ uri: albumImageURL }}
                    className='w-36 h-36'
                />
                <View>
                    <Text style={{fontWeight: 'bold', height: 30, verticalAlign: 'bottom'}}>    {songTitle}</Text>
                    <Text style={{height: 25, verticalAlign: 'bottom'}}>     by {artists}</Text>
                    <Text style={{height: 25, verticalAlign: 'bottom'}}>     on {album}</Text>
                </View>
            </View>
            
            <SongProgress progress={currTime} total={totalTime}/>
        </View>
    )
}

