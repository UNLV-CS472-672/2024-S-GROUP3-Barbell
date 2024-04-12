import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// screen dimensions
// Scaled based on screenWidth and screenHeight
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// Custom switch component show at bottom - With Animation
// Call as follows:
// <onValueChange
//     label="..."
//     value={useState()}
//     onValueChange={() => set(!On)}
// />
export default function FrontBackSwitch ({
  value,
  onValueChange,
  label,
}: {
  value: boolean
  onValueChange: () => void
  label: string
})  {
  // Use useRef to persist the animated value without reinitializing it on every render
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current

  useEffect(() => {
    // animate the switch when the value prop changes
    Animated.timing(animation, {
      // Animate to 1 if enabled, else to 0
      toValue: value ? 1 : 0,
      duration: 150,
      // since we're animating a non-native property (marginLeft keke)
      useNativeDriver: false,
    }).start()
  }, [value, animation])

  // interpolate the animated value to calculate marginLeft
  // Use screen width for compat
  const circleTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth * 0.35],
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    // Simple left to right
    // No effects
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

        <Text style={{fontSize: screenWidth * 0.04, textAlign: 'center',
          margin: 10, position: 'absolute', color: '#CACACA',
          width: screenWidth * 0.7, height: screenWidth * 0.1,
          top: 0, left: 0-(screenWidth*0.4)/2  }}>FRONT
        </Text>

        <Text style={{fontSize: screenWidth * 0.04, textAlign: 'center',
          margin: 10, position: 'absolute', color: '#CACACA',
          width: screenWidth * 0.7, height: screenWidth * 0.1,
          top: 0, left: (screenWidth*0.3)/2  }}>BACK
        </Text>

      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}


// For rectangle shape
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
    width: screenWidth * 0.7,
    height: screenWidth * 0.1,
    // Adjust shape to rectangle with round edges
    borderRadius: screenWidth * 0.02,
    justifyContent: 'center',
    // Handle thin line on the right
    marginRight: screenWidth * 0.012,
  },
  circle: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.02,
    backgroundColor: '#48476D',
  },
  label: {
    // Overlap
    fontSize: screenWidth * 0.04,
    color: '#CACACA',
  }
})
