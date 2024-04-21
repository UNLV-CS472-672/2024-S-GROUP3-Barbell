import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NavBar from '~/components/ui/nav-bar/NavBar'
import ExerciseList from '~/components/workout/exerciseList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#1E1E1E',
  },
})

export default function createNew() {
  return (
    <SafeAreaView style={styles.container}>
      <View className='h-[60px] flex-row items-center justify-evenly'>
        <NavBar center={'Exercises'} right={'Next'} />
      </View>

      <View>
        <ExerciseList />
      </View>
    </SafeAreaView>
  )
}
