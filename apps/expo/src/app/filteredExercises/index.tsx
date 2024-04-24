import type { BodyPart } from 'react-native-body-highlighter'
import React, { useState } from 'react'
import { Dimensions, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Body from 'react-native-body-highlighter'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { Ionicons } from '@expo/vector-icons'

import type { muscleSelectUser } from '~/app/muscleGroup'
import FrontBackSwitch from '~/components/muscleGroup/FrontBackSwitch'
import GenderSwitch from '~/components/muscleGroup/GenderSwitch'
import NavBar from '~/components/ui/nav-bar/NavBar'
import { Gender, useGlobalContext } from '~/context/global-context'

export default function filteredExercises(muscle: muscleSelectUser) {
  const [addCount, setAddCount] = useState('')
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  return (
    <SafeAreaView style={{ backgroundColor: '#1C1B1B', flex: 1 }}>
      <NavBar
        center={'Select Exercises'}
        right={
          <Pressable onPress={() => router.back()}>
            <Text style={{ color: '#CACACA', fontSize: 20 }}>Add{addCount}</Text>
          </Pressable>
        }
      />
      {/*<View className='flex flex-row justify-between px-5'>*/}
      {/*  <Ionicons onPress={() => router.back()} name='chevron-back' size={20} color='#CACACA' />*/}
      {/*  <Text style={{ color: '#CACACA', fontSize: 20 }}>Select exercise</Text>*/}
      {/*  <Pressable onPress={() => router.back()}>*/}
      {/*    <Text style={{ color: '#CACACA', fontSize: 20 }}>Add{addCount}</Text>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}

      {/*<View className='flex flex-row items-center'>*/}
      {/*  <Image*/}
      {/*    source={require('~assets/award/trophy.png')}*/}
      {/*    style={{*/}
      {/*      flex: 1,*/}
      {/*      width: screenWidth * 0.9,*/}
      {/*      height: screenWidth * 0.9,*/}
      {/*    }}*/}
      {/*    resizeMode='contain'*/}
      {/*  />*/}
      {/*</View>*/}

      <View className='m-2 flex flex-row items-center' style={{ position: 'absolute', bottom: 40 }}>
        <TouchableOpacity
          className='ml-5 mr-2 mt-1 flex-1 rounded-lg px-4 py-4 font-bold'
          style={{ backgroundColor: '#CACACA' }}
          onPress={() => {}}
        >
          <Text style={{ color: '#1C1B1B', textAlign: 'center' }}>Finish</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='ml-2 mr-5 mt-1 flex-1 rounded-lg px-4 py-4 font-bold'
          style={{ backgroundColor: '#48476D' }}
          onPress={() => {}}
        >
          <Text style={{ color: '#CACACA', textAlign: 'center' }}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
