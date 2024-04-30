import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Easing } from 'react-native-reanimated'

import { Entypo } from '@expo/vector-icons'

import colors from '~/styles/colors'

const UnderDevTag: React.FC = () => {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        pulse()
      })
    }

    pulse()

    return () => {
      opacity.setValue(1)
    }
  }, [opacity])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity }]}>
        <Entypo name='code' size={24} color='#881337' />
        <Text className='text-2xl font-bold text-rose-900'>Under development</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: colors.tracker.cancel,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
})

export default UnderDevTag
