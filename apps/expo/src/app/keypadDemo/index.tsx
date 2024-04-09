import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Keypad from '~/components/ui/keypad/Keypad'

export default function KeypadDemo() {
  const [number, setNumber] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keypadContainer}>
        <Keypad number={number} setNumber={setNumber} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keypadContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})
