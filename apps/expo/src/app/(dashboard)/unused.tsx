import { Text, View } from 'react-native'

import { cn } from '^/packages/ui/src/cn'

/**
 * @depraecated
 * @date 4/10/2024
 * No more development should be make here
 */
export default function Unused() {
  return (
    <View className={cn('flex-grow pt-20', `bg-background`)}>
      <Text className='text-white'>YOU SHOULDN'T SEE THIS</Text>
    </View>
  )
}
