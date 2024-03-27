import React, { forwardRef, useMemo } from 'react'
import { Button as ReactButton, StyleSheet, Text, View } from 'react-native'
import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet'

import Button from '~/components/ui/button'
import colors from '~/styles/colors'

export type Ref = BottomSheet

interface Props {
  title: string
}

const CloseBtn = () => {
  const { close } = useBottomSheet()

  return <ReactButton title="Close" onPress={() => close()} />
}

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['30%'], [])

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: colors.bottomav.nav }}
    >
      <View style={styles.contentContainer} className="mt-7">
        <Button
          color="trap"
          size="full"
          value="Start Saved Workout"
          className="mb-5"
        ></Button>
        <Button color="trap" size="full" value="Create New Workout"></Button>
      </View>
    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default CustomBottomSheet
