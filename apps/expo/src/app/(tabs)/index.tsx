import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import { useGlobalContext } from '~/context/global-context'

const Dashboard = () => {
  const { userData } = useGlobalContext()

  console.log('userData', userData)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
          options={{
            header: () => null,
          }}
        /> */}
      <Text className="m-8 text-center text-white">Home screen</Text>
      {userData ? (
        <>
          <Text>User Data</Text>
          <Text>{userData?.id}</Text>
          <Text>{userData?.clerkId}</Text>
          <Text>{userData?.name}</Text>
          <Text>{userData?.username}</Text>
        </>
      ) : (
        <RotatingBarbellIcon />
      )}
    </SafeAreaView>
  )
}

export default Dashboard
