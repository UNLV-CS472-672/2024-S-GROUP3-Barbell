import { useRef, useState } from 'react'
import { Button as RNButton, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { cn } from '@/packages/ui/src/cn'
import BottomSheet from '@gorhom/bottom-sheet'
import Button from '~/components/ui/button/button'

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
      <RNButton title="Open" onPress={handleOpenPress} color={colors.primary} />
      <RNButton
        title="Close"
        onPress={handleClosePress}
        color={colors.grey}
        // className={cn('mb-4')}
      />
      <Button
        onPress={() => router.push('/nav')}
        className='flex items-center justify-center bg-blue-500 rounded-md'
        aria-label='Go to nav'>
        <Text className='text-white'>Nav</Text>
      </Button>
      <CustomBottomSheet ref={bottomSheetRef} title={title} />
    </View>
  )
}
