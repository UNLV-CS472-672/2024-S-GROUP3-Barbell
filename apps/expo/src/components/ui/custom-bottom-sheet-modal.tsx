import { forwardRef, useCallback, useMemo } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

export type CustomBottomSheetModalRef = BottomSheetModal
export interface CustomBottomSheetModalProps {
  children: React.ReactNode
  customSnapPoints: (string | number)[]
  startIndex: number
  enablePanDownToClose?: boolean
  renderBackdrop?: boolean
}

// This component is a wrapper around the BottomSheetModal component from @gorhom/bottom-sheet.
// It's used to create a custom bottom sheet modal with the following features:
// - Custom snap points
// - Custom start index
// - Pan down to close
// - Backdrop
// Set up the component by passing the following props:
// - (REQUIRED) children: the content of the modal
// - (REQUIRED) customSnapPoints: an array of numbers or strings representing the snap points of the modal
// - (REQUIRED) startIndex: the index of the initial snap point of the customSnapPoints array
// - enablePanDownToClose: a boolean to enable or disable the pan down to close feature
// - renderBackdrop: a boolean to enable or disable the backdrop
// In order to make the modal pop up you will need to make a reference to the component and call the present method.
// Example:
/**
import { useRef } from 'react'
import { Button, Text, View } from 'react-native'
import type { CustomBottomSheetModalRef } from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheetModal from '~/components/custom-bottom-sheet-modal'

const Example = () => {
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)
  const handlePresentModalPress = () => bottomSheetRef.current?.present()

  return (
    <View>
      <Button title="Present Modal" onPress={handlePresentModalPress}></Button>
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '93%']}
        startIndex={1}
        renderBackdrop
      >
        <Text>Example</Text>
      </CustomBottomSheetModal>
    </View>
  )
}
*/
const CustomBottomSheetModal = forwardRef<
  CustomBottomSheetModalRef,
  CustomBottomSheetModalProps
>(
  (
    {
      children,
      customSnapPoints,
      startIndex,
      enablePanDownToClose,
      renderBackdrop,
    },
    ref,
  ) => {
    const snapPoints = useMemo(() => customSnapPoints, [])

    const backdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
      ),
      [],
    )

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={startIndex}
        enablePanDownToClose={enablePanDownToClose ?? true}
        backdropComponent={renderBackdrop ? backdrop : undefined}
        handleIndicatorStyle={{ backgroundColor: '#CACACA' }}
        backgroundStyle={{ backgroundColor: '#262626' }}
      >
        {children}
      </BottomSheetModal>
    )
  },
)

export default CustomBottomSheetModal
