import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import Button from '~/components/ui/button/button'

// FIXME: Dashboard start here
const Dashboard = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View>
        <Text className='text-center text-white'>Home screen</Text>
      </View>

      <Button
        onPress={() => router.push('/nav')}
        className='my-5 flex h-10 items-center rounded-md bg-blue-500'
        aria-label='Go to nav'
      >
        <Text className='text-white'>Nav</Text>
      </Button>
    </SafeAreaView>
  )
}

export default Dashboard
