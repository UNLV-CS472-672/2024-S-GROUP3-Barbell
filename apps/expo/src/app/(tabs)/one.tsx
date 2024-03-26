import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { cn } from '@/packages/ui/src/cn'
import BottomSheet from '@gorhom/bottom-sheet'

import CustomBottomSheetModal, {
  CustomBottomSheetModalRef,
} from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheet from '~/components/ui/bottom-sheet'
import colors from '~/styles/colors'

export default function TabTwoScreen() {
  const bottomSheetRef = useRef<CustomBottomSheetModalRef>(null)
  const [title, setTitle] = useState('Passing my data')

  useEffect(() => {
    bottomSheetRef.current?.present()
  }, [])

  const handlePresentModal = () => {
    bottomSheetRef.current?.present()
  }

  return (
    <View
      className={cn(
        'flex-1 items-center justify-center',
        `bg-[${colors.background}]`,
      )}
      style={{ backgroundColor: colors.background }}
    >
      <Button
        title="Open"
        onPress={handlePresentModal}
        color={colors.primary}
      />
      <CustomBottomSheetModal
        ref={bottomSheetRef}
        customSnapPoints={['30%', '10%']}
        startIndex={0}
        renderBackdrop
        enablePanDownToClose
      >
        <Text>Example Content</Text>
      </CustomBottomSheetModal>
    </View>
  )
}
