import React from 'react'
import { Text, View } from 'react-native'
import { router, Stack } from 'expo-router'

import Button from '~/components/ui/button'



const Page = () => {


  
  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Define pour custom header */}
      <Stack.Screen />

      <Button
        onPress={() => {
          router.push('/nav')
        }}
        style={{
          width: 100,
          height: 100,
          marginTop: 100,
        }}
        className='flex items-center justify-center bg-blue-500 rounded-md'
        aria-label="Go to nav"
      >
        <Text>Go to nav</Text>
      </Button>

      <Text className="text-green-700">Page is making two two</Text>
    </View>
  )
}

export default Page
