import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

const AuthScreen = () => {
  const handleSignUp = () => {
    // Sign up logic goes here
  }

  const handleSignIn = () => {
    // Sign in logic goes here
  }

  return (
    <ImageBackground
      source={require('assets/auth/background.png')}
      style={{ flex: 1, backgroundColor: '#1E1E1E' }}
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center rounded-md">
        <View className="scale-150 rounded-lg bg-white px-12 py-8">
          <Text
            className="font-koulen mb-1 pt-10 text-center text-5xl font-semibold"
            // style={{ fontFamily: 'Koulen_400Regular' }}
          >
            BARBELL
          </Text>

          <TouchableOpacity
            onPress={handleSignIn}
            className="mb-3 rounded-xl bg-black px-14 py-1"
          >
            <Text className="font-koulen pt-2 text-center text-xl font-semibold text-white">
              SIGN IN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            className="rounded-xl bg-[#48476D] px-14 py-1"
          >
            <Text className="font-koulen pt-2 text-center text-xl font-semibold text-white">
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default AuthScreen
