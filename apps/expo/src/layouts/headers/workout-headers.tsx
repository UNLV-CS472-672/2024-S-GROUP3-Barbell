import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

// SVG Imports
import ArrowLeft from '~assets/svgs/arrow-left.svg'
import NotificationSVG from '~assets/svgs/notification.svg'

export const WorkoutHeader = () => {
  return (
    <View className='flex-row items-center justify-between bg-slate-900 p-1'>
      <TouchableOpacity
        className='p-2 pt-4'
        onPress={() => {
          router.back()
        }}
      >
        <ArrowLeft width={40} height={40} />
      </TouchableOpacity>

      <Text className='font-koulen flex-1 pb-1 text-center text-5xl text-purple-400'>BARBELL</Text>

      <TouchableOpacity className='p-2'>
        <NotificationSVG width={40} height={40} />
      </TouchableOpacity>
    </View>
  )
}
