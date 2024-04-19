import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExerciseList from '~/components/workout/exerciseList'
import NavBar from '~/components/ui/nav-bar/NavBar'
import Nav from '~/app/nav'
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
      <View className="flex-row justify-evenly h-[60px] items-center">
        <NavBar
        center={'Exercises'}
        right={'Next'}
        />
      </View>

      <View>
        <ExerciseList />
        <TouchableOpacity className="px-4 py-[6px] rounded-[5px] fixed border-[#CACACA] bg-[#424242]" >
            <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
              Start Freeform Workout
            </Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}