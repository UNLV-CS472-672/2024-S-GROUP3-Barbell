import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

import { useGlobalContext } from '~/context/global-context'

const Dashboard = () => {
  const { userData } = useGlobalContext()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
          options={{
            header: () => null,
          }}
        /> */}
      <Text className="m-8 text-center text-white">Home screen</Text>
      <Text>User Data</Text>
      <Text>{userData?.id}</Text>
      <Text>{userData?.clerkId}</Text>
      <Text>{userData?.name}</Text>
      <Text>{userData?.username}</Text>
    </SafeAreaView>
  )
}

export default Dashboard
