import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { api } from '~/utils/api'

export default function ExerciseList() {
  const { data, isFetched, isFetching } = api.exercise.getAllExercises.useQuery()

  const exercises = <ScrollView>{data?.map((exercise) => <Text key={exercise.id}>{exercise.name}</Text>)}</ScrollView>

  return (
    <View>
      {isFetching && <RotatingBarbellIcon />}
      {isFetched && exercises}
    </View>
  )
}
