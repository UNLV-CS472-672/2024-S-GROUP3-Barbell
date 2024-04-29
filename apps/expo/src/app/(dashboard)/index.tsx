import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Route, router } from 'expo-router'

import { FontAwesome5 } from '@expo/vector-icons'

import RotatingBarbellIcon from '~/components/notif/RotatingBarbellIcon'
import PostDashboard from '~/components/post/PostDashboard'
import Button from '~/components/ui/button/button'
import BarbellTitle from '~/components/ui/nav-bar/BarbellTitle'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { useGlobalContext } from '~/context/global-context'
import ActivityFeed from '../activity/feed'

const Dashboard = () => {
  const { userData } = useGlobalContext()

  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      {userData ? (
        <>
          <NavBar
            left={<View />}
            center={<BarbellTitle />}
            right={
              <TouchableOpacity
                testID='message-button'
                onPress={() => router.push('notif/' as Route<string>)}
              >
                <FontAwesome5 name='inbox' size={24} color='#CACACA' />
              </TouchableOpacity>
            }
          />
          <View className='mt-4 px-4'>
            <Text className='text-4xl font-semibold text-white'>
              Hello {userData?.name.split(' ')[0]}!
            </Text>
          </View>

          <View className='mt-6 gap-y-4 px-4'>
            <PostDashboard />
            <ActivityFeed />
          </View>
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
