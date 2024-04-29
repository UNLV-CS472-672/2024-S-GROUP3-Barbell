import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import NavBar from '~/components/ui/nav-bar/NavBar'
import ExerciseList from '~/components/workout/exerciseList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function CreateNewWorkout() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar center='Exercises' right='Next' />

      <View>
        <ExerciseList />
      </View>
    </SafeAreaView>
  )
}
