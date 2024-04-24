import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import DmNotifs from '~/components/notif/dmNotifs/dmNotifs'
import GcNotifs from '~/components/notif/gcNotifs/gcNotifs'
import MiscNotifs from '~/components/notif/miscNotifs/miscNotifs'
import NavBar from '~/components/ui/nav-bar/NavBar'

export type notifsType = 'misc' | 'dm' | 'gc'

export default function NotifScreen() {
  const [visibleNotifs, setVisibleNotifs] = useState<notifsType>('misc')
  const refetch: number = 1

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      {/*header w/ back and new message buttons*/}
      <NavBar
        center={'Notifications'}
        right={
          <Link href={{ pathname: 'frlist/', params: { refetch } }} asChild={true}>
            <MaterialCommunityIcons name='message-plus-outline' size={24} color='#CACACA' />
          </Link>
        }
      />

      {/*notif nav buttons*/}
      <View className='m-2 flex flex-row items-center'>
        <TouchableOpacity
          className='ml-1 mr-1 mt-1 flex-1 rounded-lg px-4 py-2 font-bold'
          style={{ backgroundColor: visibleNotifs == 'misc' ? '#48476D' : '#CACACA' }}
          onPress={() => {
            setVisibleNotifs('misc')
          }}
        >
          <Text
            style={{ color: visibleNotifs == 'misc' ? '#CACACA' : '#1C1B1B', textAlign: 'center' }}
          >
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='ml-1 mr-1 mt-1 flex-1 rounded-lg px-4 py-2 font-bold'
          style={{ backgroundColor: visibleNotifs == 'dm' ? '#48476D' : '#CACACA' }}
          onPress={() => {
            setVisibleNotifs('dm')
          }}
        >
          <Text
            style={{ color: visibleNotifs == 'dm' ? '#CACACA' : '#1C1B1B', textAlign: 'center' }}
          >
            Direct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className='ml-1 mr-1 mt-1 flex-1 rounded-lg px-4 py-2 font-bold'
          style={{ backgroundColor: visibleNotifs == 'gc' ? '#48476D' : '#CACACA' }}
          onPress={() => {
            setVisibleNotifs('gc')
          }}
        >
          <Text
            style={{ color: visibleNotifs == 'gc' ? '#CACACA' : '#1C1B1B', textAlign: 'center' }}
          >
            Group
          </Text>
        </TouchableOpacity>
      </View>

      {/*list of notifications*/}
      <ScrollView className='flex-1'>
        <View>
          {visibleNotifs == 'misc' && <MiscNotifs />}
          {visibleNotifs == 'dm' && <DmNotifs />}
          {visibleNotifs == 'gc' && <GcNotifs />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
