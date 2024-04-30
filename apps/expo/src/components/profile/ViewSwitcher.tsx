import React from 'react'
import { Text, View } from 'react-native'

import { FontAwesome, Ionicons } from '@expo/vector-icons'

interface ViewSwitcherProps {
  viewPosts: boolean
  setViewPosts: any
}

export default function ViewSwitcher({ viewPosts, setViewPosts }: ViewSwitcherProps) {
  return (
    <View>
      <View
        className='mb-2 flex flex-row'
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#424242',
        }}
      >
        <View
          className='flex-1 basis-1/2 items-center pb-2'
          style={{
            borderBottomWidth: viewPosts ? 2 : 0,
            borderBottomColor: '#FFFFFF',
          }}
        >
          <FontAwesome
            name='newspaper-o'
            size={20}
            color={viewPosts ? '#FFFFFF' : '#737272'}
            onPress={() => setViewPosts(true)}
          />
        </View>
        <View
          className='flex-1 basis-1/2 items-center pb-2'
          style={{
            borderBottomWidth: viewPosts ? 0 : 2,
            borderBottomColor: '#FFFFFF',
          }}
        >
          <Ionicons
            name='barbell'
            size={20}
            color={viewPosts ? '#737272' : '#FFFFFF'}
            onPress={() => setViewPosts(false)}
          />
        </View>
      </View>
    </View>
  )
}
