import React, { useEffect } from 'react'
import { Animated, ColorValue, Easing, View } from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

interface RotatingBarbellIconProps {
  color?: ColorValue
}

export default function RotatingBarbellIcon({ color = '#CACACA' }: RotatingBarbellIconProps) {
  const spinValue = new Animated.Value(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [spinValue])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <MaterialCommunityIcons name="dumbbell" size={30} color={color} />
      </Animated.View>
    </View>
  )
}
