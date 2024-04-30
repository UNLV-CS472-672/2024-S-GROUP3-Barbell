import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'
import NavBar from '~/components/ui/nav-bar/NavBar'
import ExerciseList from '~/components/workout/exerciseList'
import { useGlobalContext } from '~/context/global-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function CreateNewWorkout() {
  const { selectedExercises } = useGlobalContext()

  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        center='Exercises'
        right={
          <Button color='icon' disabled={!selectedExercises.length}>
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
