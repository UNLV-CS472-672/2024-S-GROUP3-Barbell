import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutList from '~/components/workout/workoutList'
import NavBar from '~/components/ui/nav-bar/NavBar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function createNew() {



  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-evenly h-[60px] items-center">
        <NavBar
        center={'Workouts'}
        right={'Next'}
        />
      </View>

      <View className="mb-[25px] py-[20px]">
        <WorkoutList />
      </View>

      <View style={{height: 1, backgroundColor: '#CACACA', marginHorizontal: 13, opacity: 0.3, top: 10, }}/>
      <ScrollView className="mb-[25px] py-[20px]">
        <WorkoutList />
      </ScrollView>
    </SafeAreaView>
  )
}