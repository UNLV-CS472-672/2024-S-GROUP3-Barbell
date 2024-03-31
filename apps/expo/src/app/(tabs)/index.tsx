import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
          options={{
            header: () => null,
          }}
        /> */}
      <Text className="m-8 text-center text-white">Home screen</Text>
    </SafeAreaView>
  )
}

export default Page
