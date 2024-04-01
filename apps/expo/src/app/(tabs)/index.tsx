import React from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor: '#1E1E1E' }}>
        {/* Define pour custom header */}
        {/* <Stack.Screen
          options={{
            header: () => null,
          }}
        /> */}
      <Text className='text-center text-white m-8'>Home screen</Text>
    </SafeAreaView>
  )
}

export default Page
