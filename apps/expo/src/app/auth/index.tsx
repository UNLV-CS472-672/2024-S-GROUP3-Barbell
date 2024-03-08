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
      <View className="flex-1 items-center justify-center">
        <View className="scale-150 rounded-lg bg-white p-12">
          <Text
            className=" text-center text-5xl font-semibold"
            style={{ fontFamily: 'Koulen_400Regular' }}
          >
            BARBELL
          </Text>

          <TouchableOpacity
            onPress={handleSignIn}
            className="mb-8 rounded-md bg-black py-5"
          >
            <Text className="font-koulen text-center text-2xl font-semibold text-white">
              SIGN IN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            className="rounded-md bg-[#48476D] py-5"
          >
            <Text className="font-koulen text-center text-2xl font-semibold text-white">
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default AuthScreen
