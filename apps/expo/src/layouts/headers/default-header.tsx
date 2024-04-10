import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import NotificationSVG from '~assets/svgs/notification.svg'

export const DefaultHeader = () => {
  return (
    <View className='flex-row items-center justify-between bg-slate-900 p-1'>
      <View className='opacity-0'>
        <TouchableOpacity className='p-2'>
          <NotificationSVG />
        </TouchableOpacity>
      </View>

      <Text className='font-koulen text-dark-purple flex-auto pl-5 text-center text-5xl'>
        BARBELL
      </Text>

      <TouchableOpacity className='p-2 pr-5'>
        <NotificationSVG />
      </TouchableOpacity>
    </View>
  )
}
