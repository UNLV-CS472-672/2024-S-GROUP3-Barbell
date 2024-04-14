import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import ExerciseList from '~/components/workout/exerciseList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#1E1E1E',
  },
})

export default function createNew() {
  
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-row justify-evenly h-[60px] items-center">
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
      <View className="mx-3 border-[1px] border-[#CACACA] bg-[#272727] rounded-[5px]">
        <TextInput
          className="text-[12px] text-[#CACACA] px-4 py-[6px] mx-1
          placeholder:text-[#CACACA] placeholder:text-[20px] placeholder:italic" 
          placeholder= "Search workout by name..."/>
      </View>
      <View className="flex flex-row items-center m-2">
        <TouchableOpacity className="px-4 py-[6px] rounded-[5px] flex-1 mx-1 border-[1px] border-[#CACACA] bg-[#424242]" >
          <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
            Filter by Equipment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-[6px] rounded-[5px] flex-1 mx-1 border-[1px] border-[#CACACA] bg-[#424242]" >
          <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
            Use Diagram
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 1, backgroundColor: '#CACACA', marginHorizontal: 13, opacity: 0.3,}}/>
      <ScrollView className="mb-[25px] py-[5px]">
        <ExerciseList />
      </ScrollView>
      <View>
        <TouchableOpacity className=" px-4 py-[6px] bottom-[10px] rounded-[5px]  border-[#CACACA] bg-[#424242]" >
            <Text className="rounded-[5px] text-[20px] text-[#FFFFFF] text-center">
              Start Freeform Workout
            </Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}