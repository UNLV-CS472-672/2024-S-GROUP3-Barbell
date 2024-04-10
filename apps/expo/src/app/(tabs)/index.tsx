import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'

const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <Text className='m-8 text-center text-white'>Home screen</Text>
    </SafeAreaView>
  )
}

export default Dashboard
