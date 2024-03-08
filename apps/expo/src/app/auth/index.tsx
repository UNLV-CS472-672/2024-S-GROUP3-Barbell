import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import SignInWithGoogle from '~/components/auth/sign-in-w-google'

const AuthScreen = () => {
  return (
    <ImageBackground
      source={require('assets/auth/background.png')}
      style={{ flex: 1, backgroundColor: '#1E1E1E' }}
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center rounded-md">
        <View className="scale-150 rounded-lg bg-white p-7">
          <Text
            className="font-koulen mb-1 text-center text-[3.70rem] m-2 font-semibold"
          >
            BARBELL
          </Text>
          <SignInWithGoogle />
        </View>
      </View>
    </ImageBackground>
  )
}

export default AuthScreen
