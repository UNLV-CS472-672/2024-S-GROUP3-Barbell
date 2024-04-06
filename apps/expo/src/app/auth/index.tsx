import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

import SignInWithGoogle from '~/components/auth/sign-in-w-google'
import { SignOut } from '~/components/auth/sign-out'

const AuthScreen = () => {
  return (
    <ImageBackground
      source={require('~assets/auth/background.png')}
      style={{ flex: 1, backgroundColor: '#1E1E1E' }}
      resizeMode='cover'
    >
      <View className='flex-1 items-center justify-center rounded-md'>
        <View className='scale-150 rounded-lg bg-white p-7 gap-y-2'>
          <Text className='font-koulen m-2 mb-1 text-center text-[3.70rem] font-semibold'>BARBELL</Text>
          <SignInWithGoogle />
          <SignOut />
        </View>
      </View>
    </ImageBackground>
  )
}

export default AuthScreen
