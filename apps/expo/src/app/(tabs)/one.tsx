import React from 'react'
import { Button, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'

const Page = () => {
  const router = useRouter()
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Stack.Screen />
      <Text className="pt-12">Page is making</Text>
      <Button title="Go to post again" onPress={() => router.push('/post/')} />
    </View>
  )
}

export default Page
