import React, { useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { router } from 'expo-router'
import tailwind from '@/tooling/tailwind'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import MuscleGroup from '~/components/muscleGroup/muscleGroup'

export default function NewWorkoutMuscleGroup() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  // vmin: CSS
  const vmin70 = Math.min(screenWidth, screenHeight) * 0.7

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <View className="flex flex-row justify-between px-5">
        <Ionicons
          onPress={() => router.back()}
          name="chevron-back"
          size={24}
          color="#CACACA"
        />
        <Text style={{ color: '#CACACA', fontSize: 20 }}>Select a muscle group</Text>
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color="#CACACA" />
      </View>

      <View className="flex flex-row items-center">
        <MuscleGroup />
      </View>
    </SafeAreaView>
  )
}