import { useRef, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { cn } from '@/packages/ui/src/cn'
import BottomSheet from '@gorhom/bottom-sheet'

import CustomBottomSheetModal from '~/components/custom-bottom-sheet-modal'
import CustomBottomSheet from '~/components/ui/bottom-sheet/bottom-sheet'
import colors from '~/styles/colors'

export default function TabTwoScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [title, setTitle] = useState('Passing my data')

  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  return (
    <View
      className={cn(
        'flex-1 items-center justify-center',
        `bg-[${colors.background}]`,
      )}
      style={{ backgroundColor: colors.background }}
    >
      <Button title="Open" onPress={handleOpenPress} color={colors.primary} />
      <Button
        title="Close"
        onPress={handleClosePress}
        color={colors.grey}
        // className={cn('mb-4')}
      />
      <CustomBottomSheet ref={bottomSheetRef} title={title} />
    </View>
  )
}
