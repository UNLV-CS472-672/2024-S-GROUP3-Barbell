import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NavBar from '~/components/ui/nav-bar/NavBar'
import WorkoutList from '~/components/workout/workoutList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function startExisting() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavBar center={'Workouts'} right={'Next'} />
      </View>

      <View className='mb-[25px] py-[20px]'>
        <WorkoutList />
      </View>
    </SafeAreaView>
  )
}
