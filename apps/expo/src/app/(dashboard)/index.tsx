import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Route, router } from 'expo-router'

import { FontAwesome5 } from '@expo/vector-icons'

import Button from '~/components/ui/button/button'
import BarbellTitle from '~/components/ui/nav-bar/BarbellTitle'
import NavBar from '~/components/ui/nav-bar/NavBar'

// FIXME: Dashboard start here
const Dashboard = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <NavBar
        left={<View />}
        center={<BarbellTitle />}
        showDivider={false}
        right={
          <TouchableOpacity
            testID='message-button'
            onPress={() => router.push('notif/' as Route<string>)}
          >
            <FontAwesome5 name='inbox' size={24} color='#CACACA' />
          </TouchableOpacity>
        }
      />

      <Button
        onPress={() => router.push('nav/')}
        className='my-5 flex h-10 items-center rounded-md bg-blue-500'
        aria-label='Go to nav'
      >
        <Text className='text-white'>Nav</Text>
      </Button>
    </SafeAreaView>
  )
}

export default Dashboard
