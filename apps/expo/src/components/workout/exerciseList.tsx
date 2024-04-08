import { api } from '~/utils/api'
import { Text, View } from 'react-native'
import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ExerciseList() {
    const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()
    
    console.log(data)
    
    if (isFetching) {
        return <RotatingBarbellIcon />
    }

    if (isFetched || data === undefined) {
        return <ScrollView><Text>HELP</Text></ScrollView>
    }

    if(data != undefined)
    return(
        <View>
            {data.map((exercise) => (
                <Text key={exercise.id}>{exercise.name}</Text>
            ))}
        </View>
    )
}