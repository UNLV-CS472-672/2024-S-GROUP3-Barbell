import { useRef, useState } from 'react'
import { Button as RNButton, Text, View } from 'react-native'
import { router } from 'expo-router'

import { cn } from '^/packages/ui/src/cn'
import BottomSheet from '@gorhom/bottom-sheet'

import CustomBottomSheet from '~/components/ui/bottom-sheet/bottom-sheet'
import Button from '~/components/ui/button/button'
import colors from '~/styles/colors'

export default function TabTwoScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [title, setTitle] = useState('Passing my data')

  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()

  return (
    <View
      className={cn('flex-1 items-center justify-center', `bg-[${colors.background}]`)}
      style={{ backgroundColor: colors.background }}
    >
      <RNButton title="Open" onPress={handleOpenPress} color={colors.primary} />
      <RNButton title="Close" onPress={handleClosePress} color={colors.grey} />
      <Button
        onPress={() => router.push('/nav')}
        className="flex h-10 w-24 items-center justify-center rounded-md bg-blue-500"
        aria-label="Go to nav"
      >
        <Text className="text-white">Nav</Text>
      </Button>
      <CustomBottomSheet ref={bottomSheetRef} title={title} />
    </View>
  )
}
