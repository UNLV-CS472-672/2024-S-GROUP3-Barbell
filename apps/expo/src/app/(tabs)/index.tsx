import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

import { DefaultHeader } from '~/layouts/headers/default'

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* <Stack.Screen
        options={{
          header: () => (
            <DefaultHeader
              onCategoryChanged={() => {
                'Cabins'
              }}
            />
          ),
        }}
      /> */}
      <Text className="m-8 text-center text-white">Home screen</Text>
    </SafeAreaView>
  )
}

export default Page
