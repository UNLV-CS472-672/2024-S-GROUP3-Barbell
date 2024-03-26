import React from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Page = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Define pour custom header */}
      <Stack.Screen />
      <Text>Page is making</Text>
    </View>
  )
}

export default Page
