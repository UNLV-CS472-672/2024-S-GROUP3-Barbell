import type { Route } from 'expo-router'
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: '#1E1E1E',
  },
})
/*` screenName: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
  },`*/
const createNew = () => {
  return (
    <SafeAreaView style={styles.container}>
         <View className="flex-row justify-evenly h-[60px]">
            
            <Text className='font-koulen text-4xl font-semibold text-[#48476D] text-center px-16'>Barbell</Text>
            <Text className='font-koulen text-4xl font-semibold text-[#48476D] text-center px-16'>Next</Text>
         </View>

    </SafeAreaView>
  )
}

export default createNew
