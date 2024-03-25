import { View, Text, Dimensions, Image } from 'react-native'
import { GlobalContext } from '~/context/global-context'

import { api } from '~/utils/api'


export default function Spotify(){
    const { data } = api.spotify.getSpotifyDataFromUserId.useQuery({id: 4})
    if(data!=null && data!=undefined){
        return(
            <View>
                <Text>
                    User is actively listening to {data.title}
                </Text>
            </View>
        )
    }
    return(
        <View>
            <Text>User is currently offline.</Text>
        </View>
    )
}