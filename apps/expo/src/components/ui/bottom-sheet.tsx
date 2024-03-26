import React, { forwardRef, useMemo } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet'

export type Ref = BottomSheet

interface Props {
  title: string
}

const CloseBtn = () => {
  const { close } = useBottomSheet()

  return <Button title="Close" onPress={() => close()} />
}

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: '#1d0f4e' }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
        <CloseBtn />
      </View>
    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: '#fff',
  },
})

export default CustomBottomSheet
