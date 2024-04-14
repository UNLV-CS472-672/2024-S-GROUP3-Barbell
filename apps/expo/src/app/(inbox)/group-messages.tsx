import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import Button from '~/components/ui/button/button'

const GroupMessages = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View>
        <Text className='text-center text-white'>GroupMessages screen ye</Text>
        <Button
          onPress={() => router.push('(inbox)/')}
          className='my-10 flex h-24  items-center justify-center'
        >
          <Text className='text-center text-white'>Go back notifs</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default GroupMessages
