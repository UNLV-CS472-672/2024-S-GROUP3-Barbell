import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Keypad from '~/components/ui/keypad/Keypad'

export default function KeypadDemo() {
  const [number, setNumber] = useState('')
  const [keypadVisible, setKeypadVisible] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '100%' }}
          keyboardType="visible-password"
          onPressOut={() => setKeypadVisible(true)}
          onBlur={() => {
            setKeypadVisible(false)
          }}
          value={number}
        />

        <TextInput style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '100%' }} />
      </View>
      <View style={styles.keypadContainer}>
        <Keypad
          number={number}
          setNumber={setNumber}
          keypadVisible={keypadVisible}
          setKeypadVisible={setKeypadVisible}
        />
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
