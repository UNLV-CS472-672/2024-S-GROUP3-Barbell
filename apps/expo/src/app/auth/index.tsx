import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const AuthScreen = () => {
  const handleSignUp = () => {
    // Sign up logic goes here
  }

  const handleSignIn = () => {
    // Sign in logic goes here
  }

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="rounded-lg bg-white p-6">
        <Text className="mb-6 text-center text-3xl font-bold">BARBELL</Text>
        <TouchableOpacity
          onPress={handleSignIn}
          className="mb-4 rounded-md bg-black py-3"
        >
          <Text className="text-center font-bold text-white">SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          className="rounded-md bg-purple-600 py-3"
        >
          <Text className="text-center font-bold text-white">SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AuthScreen
