import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import Button from '~/components/ui/button/button'

// FIXME: Dashboard start here
const Workout = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#1E1E1E', flex: 1 }}>
      <View>
        <Text className='text-center text-white'>Workout screen ye</Text>
      </View>
    </SafeAreaView>
  )
}

export default Workout
