import React from 'react'
import { Button, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'

const Page = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, marginTop: 80, backgroundColor: '#1E1E1E' }}>
      <Text className="pt-12">Page is making</Text>
      <Button title="Go to post again" onPress={() => router.push('/post/')} />
    </View>
  )
}

export default Page
