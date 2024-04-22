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
            <Text>Just testing out this funny lil graph. Yippee!</Text>
            <DisplayWorkoutFrequencyGraph userID={userData.id}/>
        </View>
    )
}