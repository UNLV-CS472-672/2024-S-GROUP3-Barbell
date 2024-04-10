import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

// import { Ionicons } from '@expo/vector-icons'
import ArrowLeft from '~assets/svgs/arrow-left.svg'
import NotificationSVG from '~assets/svgs/notification.svg'

export const WorkoutHeader = () => {
  return (
    <View className='flex-row items-center justify-between bg-slate-900 p-1'>
      <TouchableOpacity
        className='p-2 pl-2.5'
        onPress={() => {
          router.back()
        }}
      >
        <ArrowLeft />
        {/* <Ionicons name='arrow-back-circle-outline' size={40} color='#CACACA' /> */}
      </TouchableOpacity>

      <Text className='font-koulen text-dark-purple flex-auto px-2.5 text-center text-5xl'>
        BARBELL
      </Text>

      <TouchableOpacity className='p-2 pr-2.5'>
        <NotificationSVG />
      </TouchableOpacity>
    </View>
  )
}
