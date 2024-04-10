import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'

const Dashboard = () => {
  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <Text className='text-center text-white'>Home screen</Text>
    </SafeAreaView>
  )
}

export default Dashboard
