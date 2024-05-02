import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'
import NavBar from '~/components/ui/nav-bar/NavBar'
import ExerciseList from '~/components/workout/exerciseList'
import { useGlobalContext } from '~/context/global-context'
import { api } from '~/utils/trpc/api'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function CreateNewWorkout() {
  const { selectedExercises, bottomSheetRef, setWorkoutTemplateId, userData } = useGlobalContext()
  const workoutTemplateMutator = api.workoutTemplate.createWorkoutTemplate.useMutation()

  const handleStartWorkout = async () => {
    router.replace('(dashboard)/')
    const workoutTemplateIdResponse = await workoutTemplateMutator.mutateAsync({
      exerciseIds: selectedExercises,
      userId: userData?.id!,
      name: 'New Workout',
    })
    setWorkoutTemplateId(workoutTemplateIdResponse)
    bottomSheetRef?.current?.present()
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        center='Exercises'
        right={
          <Button color='icon' disabled={!selectedExercises.length} onPress={handleStartWorkout}>
            <Text numberOfLines={1} style={{ color: '#CACACA', fontSize: 16 }}>
              {selectedExercises.length === 0 ? 'Add' : `Add(${selectedExercises.length})`}
            </Text>
          </Button>
        }
      />

      <View>
        <ExerciseList />
      </View>
    </SafeAreaView>
  )
}
