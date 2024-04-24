import {View, Text, SafeAreaView} from 'react-native'
import DisplayWorkoutFrequencyGraph from '~/components/workout/frequency_graph'

import { useGlobalContext } from '~/context/global-context'

export default function GraphDemo() {
    const {userData} = useGlobalContext()
    if(!userData){
        return null
    }

    // Context exists so we chilling
    
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DisplayWorkoutFrequencyGraph userID={userData.id}/>
        </View>
    )
}