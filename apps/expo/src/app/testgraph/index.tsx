import WorkoutFrequencyGraph from '~/components/workout/frequencyChart';

import {View, Text} from 'react-native'

import { GlobalContext } from "~/context/global-context";

// This file is literally just to test out the graph and make sure it works
// It just renders the button and calls it a day
export default function GraphScreen(){
    return(
        <View>
            <WorkoutFrequencyGraph userid={2}/>
        </View>
    )
}