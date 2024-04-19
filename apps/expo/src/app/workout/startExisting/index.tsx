import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutList from '~/components/workout/workoutList'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
})

export default function createNew() {



  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-evenly h-[40px] items-center">
        <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-[20px] text-[#FFFFFF] text-center px-16'">
              Back
            </Text>
        </TouchableOpacity>
        <Text className="font-koulen text-4xl font-semibold text-[#48476D] text-center px-20">Barbell</Text>
        <TouchableOpacity>
          <Text className="text-[20px] text-[#FFFFFF] text-center px-16'">
            Next
          </Text>
        </TouchableOpacity>
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