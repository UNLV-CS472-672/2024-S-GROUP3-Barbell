import { useState } from 'react'
import { Button as RNButton, Text, View } from 'react-native'
import { router } from 'expo-router'

import { cn } from '^/packages/ui/src/cn'

import CustomBottomSheet from '~/components/ui/bottom-sheet/bottom-sheet'
import Button from '~/components/ui/button/button'
import { useTBottomSheet } from '~/hooks/useTBottomSheet'
import colors from '~/styles/colors'

export default function TabTwoScreen() {
  const [title, setTitle] = useState('Passing my data')
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useTBottomSheet()

  console.log('bottomSheetRef', bottomSheetRef)

  return (
    <View className={cn('mt-20 flex-grow', `bg-background`)}>
      <RNButton title="Open" onPress={openBottomSheet} color={colors.primary} />
      <RNButton title="Close" onPress={closeBottomSheet} color={colors.grey} />

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
