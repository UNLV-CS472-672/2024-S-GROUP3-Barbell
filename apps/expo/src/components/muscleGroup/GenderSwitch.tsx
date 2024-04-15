import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

// screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// Use as react native switch
// Same syntax
export default function Toggle ({
                                  value,
                                  onValueChange,
                                }: {
  value: boolean
  onValueChange: () => void
})  {
  // Use useRef to persist the animated value without reinitializing it on every render
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    // animate the switch when the value prop changes
    Animated.timing(animation, {
      toValue: value ? 1 : 0, // Animate to 1 if enabled, else to 0
      duration: 150,
      useNativeDriver: false, // since we're animating a non-native property (marginLeft keke)
    }).start()
  }, [value, animation])

  // interpolate the animated value to calculate marginLeft
  // Use screen width for compat
  const circleTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth * 0.01, screenWidth * 0.106],
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#797979', '#797979'],
  })

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity onPress={onValueChange} activeOpacity={1}>
        <Animated.View style={[styles.switch, { backgroundColor }]}>
          {/* Animated the marginLeft of the circle */}
          <Animated.View
            style={[styles.circle, { marginLeft: circleTransform }]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}


// Should default to user gender

// Color is non-indicative
// Inside circle purple
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1B1B',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenWidth * 0.015,
  },
  switch: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.05,
    borderRadius: screenWidth * 0.025,
    justifyContent: 'center',
    marginRight: screenWidth * 0.01,
  },
  circle: {
    width: screenWidth * 0.035,
    height: screenWidth * 0.035,
    borderRadius: screenWidth * 0.05,
    backgroundColor: '#48476D',
  }
})
