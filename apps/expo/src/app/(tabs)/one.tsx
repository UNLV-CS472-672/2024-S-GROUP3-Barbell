import { useRef, useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import CustomBottomSheet from '~/components/ui/bottom-sheet'

export default function TabTwoScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [title, setTitle] = useState('Passing my data')

  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  return (
    <View style={styles.container}>
      <Button title="Open" onPress={handleOpenPress} />
      <Button title="Close" onPress={handleClosePress} />
      <CustomBottomSheet ref={bottomSheetRef} title={title} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
})
