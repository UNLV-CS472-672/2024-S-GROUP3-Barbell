import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
  return (
    <SafeAreaView className='flex-gr ' style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View>
        <Text className='text-center text-white'>Home screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
