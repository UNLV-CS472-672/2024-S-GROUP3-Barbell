import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export const DefaultHeader = () => {
  return (
    <View className=' px-4 py-3'>
      <View className='flex flex-row items-center justify-between'>
        <Text className='text-xl font-bold text-white'>BARBELL</Text>
        <TouchableOpacity className='p-2'>
          <Ionicons name='notifications-outline' size={24} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

