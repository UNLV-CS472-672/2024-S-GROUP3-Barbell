import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import Button from '~/components/ui/button/button'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'

const Dashboard = () => {
  const { userData } = useGlobalContext()

  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      {userData ? (
        <>
          <NavBar center='Home' />
          <View className='mt-4 px-4'>
            <Text className='text-4xl font-semibold text-white'>
              Hello {userData?.name.split(' ')[0]}!
            </Text>
          </View>

          <Button
            onPress={() => router.push('nav/')}
            className='my-5 flex h-10 items-center rounded-md bg-blue-500'
            aria-label='Go to nav'
          >
            <Text className='text-white'>Nav</Text>
          </Button>
        </>
      ) : (
        <View className='flex h-full items-center justify-center'>
          <RotatingBarbellIcon />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Dashboard
